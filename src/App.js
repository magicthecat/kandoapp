import React, { useState, useEffect } from 'react';
import { useContext, createContext, useMemo } from 'react';
import { Switch, Route, Link, useRoute } from 'wouter'
import { kanbanSchemas } from './schemas/kanbanSchemas';

class ApiClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async get(resource) {
    const response = await fetch(`${this.baseURL}/${resource}`);
    return response.json();
  }

  async post(resource, data) {
    const response = await fetch(`${this.baseURL}/${resource}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return response.json();
  }

  async put(resource, id, data) {
    const response = await fetch(`${this.baseURL}/${resource}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return response.json();
  }

  async delete(resource, id) {
    const response = await fetch(`${this.baseURL}/${resource}/${id}`, {
      method: 'DELETE',
    });
    return response.ok;
  }

  async getWithChildren(resource, id, childResource) {
    console.log(childResource)
    const response = await fetch(`${this.baseURL}/${resource}/${id}`);
    const item = await response.json();

    const childResponse = await fetch(`${this.baseURL}/tasks`);
    let children = await childResponse.json();

    console.log(`${this.baseURL}/tasks`)
    // Filter the children array to only include items where values[childResourceId] === id

    children = children.filter(child => {
      console.log(child.values)
      return child.values && child.values[`epicId`] === id;
    });
    console.log({ ...item, children })
    return { ...item, children };
  }
}

const apiClient = new ApiClient('http://localhost:3002');
const ApiContext = createContext(apiClient);

function ApiProvider({ children, schema }) {
  const memoizedSchema = useMemo(() => schema, []);

  return (
    <ApiContext.Provider value={{ api: apiClient, schema: memoizedSchema }}>
      {children}
    </ApiContext.Provider>
  );
}

function useApi() {
  const contextValue = useContext(ApiContext);
  if (!contextValue) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  return contextValue;
}



class CrudCustomHooks {


  static useAddItem = () => {
    const { api, schema } = useApi();
    const [formFields, setFormFields] = useState(schema.fields);
    const parentOptions = schema.parent
      ? this.useFetchParentOptions(schema.parent, schema.parent.idField, schema.fields)
      : [];

    const handleInputChange = (event) => {
      setFormFields({
        ...formFields,
        [event.target.name]: { ...formFields[event.target.name], value: event.target.value }
      });
    };

    const handleAddSubmit = async (event) => {
      event.preventDefault();
      const data = {};
      for (let field in formFields) {
        data[field] = formFields[field].value;
      }
      await api.post(schema.resource, { values: data });
      setFormFields(schema.fields);
    };

    return {
      formFields,
      parentOptions,
      handleInputChange,
      handleAddSubmit,
    };
  };


  static useViewItem = () => {
    const { api, schema } = useApi();
    const [item, setItem] = useState(null);
    const [match, params] = useRoute(`${schema.path}/:id`);

    useEffect(() => {
      if (match && params.id) {
        api.get(`${schema.resource}/${params.id}`)
          .then(data => setItem(data));
      }
    }, [match, params.id, api, schema.resource]);

    return {
      item,
    };
  };

  static useListItems = () => {


    const { api, schema } = useApi();
    const [items, setItems] = useState([]);

    useEffect(() => {
      api.get(schema.resource)
        .then(data => Array.isArray(data) ? setItems(data) : setItems([]));


    }, [api, schema]);

    return { items }

  }

  static useFetchItem = (resource, id) => {
    const { api, schema } = useApi();
    const [item, setItem] = useState(null);

    useEffect(() => {
      const fetchItem = async () => {
        const response = await api.get(`${resource}/${id}`);
        setItem(response);
      };

      fetchItem();
    }, [api, resource, id]);

    return item;
  };


  static useHandleForm = (initialFields, resource, id) => {
    const { api } = useApi();
    const [formFields, setFormFields] = useState(initialFields);

    const handleInputChange = (event) => {
      setFormFields({
        ...formFields,
        [event.target.name]: { ...formFields[event.target.name], value: event.target.value }
      });
    };

    const handleFormSubmit = async (event) => {
      event.preventDefault();
      const data = {};
      for (let field in formFields) {
        data[field] = formFields[field].value;
      }
      await api.put(resource, id, { values: data });
    };

    return [formFields, handleInputChange, handleFormSubmit];
  };

  static useFetchParentOptions = (parent, idField, fields) => {
    const { api } = useApi();
    const [options, setOptions] = useState([]);

    useEffect(() => {
      const fetchParentOptions = async () => {
        try {
          const shouldFetch = parent && idField && fields && fields[idField]?.isDynamicSelect;

          if (!shouldFetch) {
            setOptions([]);
            return;
          }

          const parentData = await api.get(parent.schema.resource);

          if (Array.isArray(parentData)) {
            const options = parentData.map(item => ({ value: item.id, label: item.values.name }));
            setOptions(options);
          }
        } catch (err) {
          console.error(`Error in useFetchParentOptions: ${err.message}`);
        }
      };

      fetchParentOptions();
    }, [api, parent, idField, fields]);

    return options;
  }

  static useFetchChildItems = (parentId, childSchema) => {
    const { api } = useApi();
    const [childItems, setChildItems] = useState(null);

    useEffect(() => {
      api.get(childSchema.resource)
        .then(data => {
          if (data) {
            const filteredItems = data.filter(item => Number(item.values[childSchema.parent.idField]) === Number(parentId));
            console.log(filteredItems)
            setChildItems(filteredItems);
          } else {
            setChildItems([]);
          }
        })
        .catch(console.error);

    }, [parentId, childSchema, api]);
    console.log(childItems)
    return childItems;
  }

}

function KeyValuePairsList() {
  const { api, schema } = useApi();
  const [item, setItem] = useState(null);
  const [match, params] = useRoute(`${schema.path}/:id`);

  useEffect(() => {
    if (match && params.id) {
      api.get(`${schema.resource}/${params.id}`)
        .then(data => setItem(data));
    }
  }, [match, params.id, api, schema.resource]);

  if (!item) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div>
        {item.values && Object.entries(item.values).map(([key, value]) => (
          <p key={key}>{`${key}: ${value}`}</p>
        ))}
      </div>
    </>

  );
}


const ListPage = ({ styles }) => {

  const { items } = CrudCustomHooks.useListItems();
  const { schema } = useApi();
  return (
    <>
      <Link to={`${schema.path}/create`}>Add {schema.description.singular}</Link>
      <div className={styles.listContainer}>
        {items.map((item) => (
          <div key={item.id} className={styles.listItem}>
            {item.values && Object.entries(item.values).map(([key, value]) => (
              <p key={key}>{`${key}: ${value}`}</p>
            ))}
            <Link href={`${schema.path}/${item.id}`}>View</Link>
            <Link href={`${schema.path}/${item.id}/edit`}>Edit</Link>


          </div>
        ))}
      </div>
    </>
  );
};

function AddItemPage() {
  const { schema } = useApi();
  const { formFields, parentOptions, handleInputChange, handleAddSubmit } = CrudCustomHooks.useAddItem();

  return (
    <div>
      <h2>Create {schema.description.singular}</h2>
      <div className={schema.styles.formContainer}>
        <form onSubmit={handleAddSubmit}>
          {Object.entries(formFields).map(([fieldName, fieldDetails]) => (
            <label key={fieldName}>
              {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}:
              {fieldDetails.type === 'textarea' ? (
                <textarea
                  name={fieldName}
                  value={fieldDetails.value}
                  onChange={handleInputChange}
                  required={fieldDetails.required}
                />
              ) : fieldDetails.type === 'select' ? (
                <select
                  name={fieldName}
                  value={fieldDetails.value}
                  onChange={handleInputChange}
                  required={fieldDetails.required}
                >
                  <option value="">Select...</option>
                  {fieldDetails.isDynamicSelect ? (
                    parentOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))
                  ) : (
                    fieldDetails.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))
                  )}
                </select>
              ) : (
                <input
                  type={fieldDetails.type}
                  name={fieldName}
                  value={fieldDetails.value}
                  onChange={handleInputChange}
                  required={fieldDetails.required}
                />
              )}
            </label>
          ))}
          <button type="submit">Add Item</button>
        </form>
      </div>
      <Link href={schema.path}>Back to {schema.description.title}</Link>
    </div>
  );
};


function ViewItemPage0() {
  const { schema } = useContext(ApiContext);
  const { item } = CrudCustomHooks.useViewItem();

  if (!item) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Link href={schema.path}>Back to {schema.description.title}</Link>
      <KeyValuePairsList item={item} />

    </div>
  );
}

function ViewItemPage() {
  const { schema } = useContext(ApiContext);
  const { item } = CrudCustomHooks.useViewItem();

  if (!item) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Link href={schema.path}>Back to {schema.description.title}</Link>
      <KeyValuePairsList item={item} />

      {schema.children.map(childSchemaName => {
        const childSchema = kanbanSchemas.find(s => s.resource === childSchemaName);
        if (!childSchema) {
          console.error(`Child schema "${childSchemaName}" not found`);
          return null;
        }

        return (
          <ChildItemList
            key={childSchemaName}
            parentItem={item}
            childSchema={childSchema}
          />
        );
      })}
    </div>
  );
}

function EditItemPage() {
  const { schema } = useApi();
  const [match, params] = useRoute(`${schema.path}/:id/edit`);
  const item = CrudCustomHooks.useFetchItem(schema.resource, params.id);
  const parentOptions = CrudCustomHooks.useFetchParentOptions(schema.parent, schema.parent.idField, schema.fields);
  console.log(schema.parent.idField)
  const initialFields = schema.fields;
  if (item) {
    Object.keys(item.values).forEach(key => {
      if (initialFields[key]) {
        initialFields[key].value = item.values[key];
      }
    });
  }
  const [formFields, handleInputChange, handleFormSubmit] = CrudCustomHooks.useHandleForm(initialFields, schema.resource, params.id);


  return (
    <div>
      <h2>Edit {schema.description.singular}</h2>
      <div className={schema.styles.formContainer}>
        <form onSubmit={handleFormSubmit}>
          {Object.entries(formFields).map(([fieldName, fieldDetails]) => (
            <label key={fieldName}>
              {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}:
              {fieldDetails.type === 'textarea' ? (
                <textarea
                  name={fieldName}
                  value={fieldDetails.value}
                  onChange={handleInputChange}
                  required={fieldDetails.required}
                />
              ) : fieldDetails.type === 'select' ? (
                <select
                  name={fieldName}
                  value={fieldDetails.value}
                  onChange={handleInputChange}
                  required={fieldDetails.required}
                >
                  <option value="">Select...</option>
                  {fieldDetails.isDynamicSelect ? (
                    parentOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))
                  ) : (
                    fieldDetails.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))
                  )}
                </select>
              ) : (
                <input
                  type={fieldDetails.type}
                  name={fieldName}
                  value={fieldDetails.value}
                  onChange={handleInputChange}
                  required={fieldDetails.required}
                />
              )}
            </label>
          ))}
          <button type="submit">Save Changes</button>
        </form>
      </div>
      <Link href={schema.path}>Back to {schema.description.title}</Link>
    </div>
  );
}

function ChildItemList({ parentItem, childSchema }) {
  const childItems = CrudCustomHooks.useFetchChildItems(parentItem.id, childSchema);

  if (!childItems) {
    return <p>Loading {childSchema.description.title}...</p>;
  }

  return (
    <div>
      <h2>{childSchema.description.title}</h2>
      {childItems.map((item, index) => (
        <div key={index}>
          {item.values && Object.entries(item.values).map(([key, value]) => (
            <p key={key}>{`${key}: ${value}`}</p>
          ))}
        </div>
      ))}
    </div>
  );
}




function App() {
  const schemas = kanbanSchemas;

  return (
    <div>
      <nav>
        {schemas.map((schema, index) => (
          <Link key={index} href={schema.path}>
            {schema.description.title}
          </Link>
        ))}
      </nav>
      <Switch>
        {schemas.map((schema, index) => (
          <Route key={`list-${index}`} path={schema.path}>
            <ApiProvider schema={schema}>
              <ListPage styles={schema.styles} />
            </ApiProvider>
          </Route>
        ))}
        {schemas.map((schema, index) => (
          <Route key={`create-${index}`} path={`${schema.path}/create`}>
            <ApiProvider schema={schema}>
              <AddItemPage />
            </ApiProvider>
          </Route>
        ))}
        {schemas.map((schema, index) => (
          <Route key={`view-${index}`} path={`${schema.path}/:id`}>
            <ApiProvider schema={schema}>
              <ViewItemPage />
            </ApiProvider>
          </Route>
        ))}
        {schemas.map((schema, index) => (
          <Route key={`edit-${index}`} path={`${schema.path}/:id/edit`}>
            <ApiProvider schema={schema}>
              <EditItemPage />
            </ApiProvider>
          </Route>
        ))}


      </Switch>
    </div>
  );
}








export default App