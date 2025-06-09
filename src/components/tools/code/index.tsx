import CodeFormatter from './CodeFormatter';
import JsonFormatter from "./JsonFormatter";
import XmlFormatter from "./XmlFormatter";
import HtmlFormatter from "./HtmlFormatter";
import CssFormatter from "./CssFormatter";
import JavaScriptMinifier from "./JavaScriptMinifier";
import CodeRunner from "./CodeRunner";

const codeTools = {
  "code-formatter": CodeFormatter,
  "json-formatter": JsonFormatter,
  "xml-formatter": XmlFormatter,
  "html-formatter": HtmlFormatter,
  "css-formatter": CssFormatter,
  "js-minifier": JavaScriptMinifier,
  "code-runner": CodeRunner,
};

export default codeTools;