export const NavigationItem = ({ page, LinkComponent }) => {

  return (
    <li key={page.path}>
      <LinkComponent to={page.path}>{page.pageTitle}</LinkComponent>
    </li>
  )

}
export const Navigation = ({ navigationData, LinkComponent }) => {

  return (
    <nav>
      <ul>
        {navigationData.map((page) => (
          <NavigationItem page={page} LinkComponent={LinkComponent} />
        ))}
      </ul>
    </nav>
  )
}

export const NavigationWrapper = ({ children, navigationDataCallBack, LinkComponent, SwitchComponent }) => {

  return (
    <>
      <Navigation LinkComponent={LinkComponent} navigationData={navigationDataCallBack(children)} />
      <SwitchComponent>
        {children}
      </SwitchComponent>
    </>
  );
};
