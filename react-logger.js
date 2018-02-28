export default function(logging = true) {
  return function log(target, name, descriptor) {
    const func = descriptor.value;
    descriptor.value = function (...args) {
      if (logging === false) {
        return func.bind(this)(...args);
      }
      const log = console.log;
      log("class: %c" + this.constructor.name, 'color: magenta;');
      log("  method: %c" + name, 'color: green;');
      log("    props:" + JSON.stringify(this.props));
      log("    state:" + JSON.stringify(this.state));
      const [propsArg, stateArg] = args;
      switch (name) {
        case "componentWillReceiveProps":
          log("    nextProps:" + JSON.stringify(propsArg));
          break;
        case "shouldComponentUpdate":
        case "componentWillUpdate":
          log("    nextProps:" + JSON.stringify(propsArg));
          log("    nextState:" + JSON.stringify(stateArg));
          break;
        case "componentDidUpdate":
          log("    prevProps:" + JSON.stringify(propsArg));
          log("    prevState:" + JSON.stringify(stateArg));
          break;
      }
      return func.bind(this)(...args);
    };
    return descriptor;
  }
}
