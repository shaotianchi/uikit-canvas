export default {
  inherit (son, father) {
    if (Reflect.has(son, 'super')) {
      son.super = father;
    } else {
      Reflect.defineProperty(son, 'super', {
        value: () => father
      });
    }
    son._super = father;
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
    return son;
  }
}