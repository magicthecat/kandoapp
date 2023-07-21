import React from "react";

export class RoutingUtil {

    static getPageRouting = (children) => {
        const childrenPropsArray = [];

        React.Children.forEach(children, (child) => {
            const { path, metaData } = child.props;
            if (
                path &&
                !path.includes(':') && // Exclude paths with colons
                !path.includes('?') && // Exclude paths with question marks
                metaData?.pageTitle
            ) {
                childrenPropsArray.push({
                    path,
                    pageTitle: metaData.pageTitle,
                });
            }
        });

        return childrenPropsArray;
    };

    static getPageDetailsByPath = ({ pagesData, path }) => {
        // Find the page details that match the current route
        const page = pagesData.find((pageData) => {
            // Use RegExp to match the route pattern
            const pattern = new RegExp('^' + pageData.path.replace(/:\w+/, '\\w+').replace(/\//g, '\\/') + '$');
            return pattern.test(path);
        });

        return page;
    };

    static getParentPath = ({ path }) => {

        const segments = path.split('/').filter(Boolean);
        const parentPath = '/' + segments.slice(0, segments.length - 1).join('/');

        return parentPath

    }



}