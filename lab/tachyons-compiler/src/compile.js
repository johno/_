import { transform } from "@babel/standalone";
import jsxSyntax from "@babel/plugin-syntax-jsx";

const hyphenify = (str) => str.replace(/\./g, "-");
const classNamify = (property, value) => {
  const key = classMap[property];
  return [key, transformer[key || property](value)].filter(Boolean).join("-");
};

const classMap = {
  color: "",
  backgroundColor: "bg",
};

const transformer = {
  color: (v) => v,
  bg: hyphenify,
};

const getClassNames = (path, sxProp) => {
  const cx = [];
  const cxMap = {};
  const styles = sxProp.value?.expression?.properties;

  if (!styles?.length) {
    return;
  }

  // TODO: Check to make sure it's mappable
  styles.forEach((style) => {
    const key = style.key?.name;
    const value = style.value?.value;

    // TODO: Check against theme to make sure value is accounted for
    if (!key || !classMap.hasOwnProperty(key) || !value) {
      return;
    }

    const result = {
      key,
      value,
      className: classNamify(key, value),
    };

    cx.push(result);
    cxMap[key] = true;
  });

  sxProp.value.expression.properties = sxProp.value.expression.properties.filter(
    (v) => !cxMap[v.key?.name]
  );

  return { cx, sxProp };
};

const compilePlugin = (api) => {
  const { types: t } = api;

  return {
    visitor: {
      JSXOpeningElement(path) {
        const sxProp = path.node.attributes.find(
          (node) => node?.name?.name === "sx"
        );
        const classNameProp = path.node.attributes.find(
          (node) => node?.name?.name === "className"
        );

        if (!sxProp) {
          return;
        }

        const { cx, sxProp: newSxProp } = getClassNames(path, sxProp) || {};
        if (!cx.length) {
          return;
        }

        if (!newSxProp.value.expression.properties.length) {
          path.node.attributes = path.node.attributes.filter(
            (node) => node?.name?.name !== "sx"
          );
        }

        const addedClasses = cx.map((c) => c.className).join(" ");
        if (!classNameProp) {
          path.node.attributes.push(
            t.jsxAttribute(
              t.jsxIdentifier("className"),
              t.stringLiteral(addedClasses)
            )
          );
        } else {
        }
      },
    },
  };
};

export const compile = (jsx) => {
  const result = transform(jsx, {
    plugins: [jsxSyntax, compilePlugin],
  });

  return result.code;
};
