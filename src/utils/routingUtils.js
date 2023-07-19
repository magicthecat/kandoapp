import React from "react";

export class RoutingUtil {

    static getPageRouting = (children) => {
        const childrenPropsArray = [];

        React.Children.forEach(children, (child) => {
            if (child.props.path && child.props.metaData?.pageTitle) {
                childrenPropsArray.push({
                    path: child.props.path,
                    pageTitle: child.props.metaData.pageTitle,
                });
            }
        });

        return childrenPropsArray;
    };


}