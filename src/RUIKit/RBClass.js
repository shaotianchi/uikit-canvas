export default {
  inherit (son, father) {
    if (Reflect.has(son, '__super')) {
      son.__super = father;
    } else {
      Reflect.defineProperty(son, '__super', {
        value: () => father,
      });
    }
    const fatherKeys = Reflect.ownKeys(father);
    fatherKeys.forEach(key => {
      if (Reflect.has(son, key)) { return; }
      Reflect.defineProperty(son, key, { 
        value: Reflect.get(father, key),
        writable: true,
        enumerable: true,
        configurable: true 
      });
    });
    return new Proxy(son, {
      set: function(obj, prop, value) {
        obj.willSet(prop, value);
        obj[prop] = value;
        return true;
      }
    });
  }
}