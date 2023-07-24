export default class Schema {
    constructor({ description, resource, path, styles, fields, parent = { schema: null, idField: null }, children = [], dynamicallyDisplayChildren = false }) {
        this.description = description;
        this.resource = resource;
        this.path = path;
        this.styles = styles;
        this.fields = fields;
        this.parent = parent;
        this.children = children;
        this.dynamicallyDisplayChildren = dynamicallyDisplayChildren;

    }
}