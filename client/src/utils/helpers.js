export function pluralize(name, count) {
  if (count === 1) {
    return name;
  }
  return name + "s";
}

export function idbPromise(storeName, method, object) {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open("shop-shop", 1);
    let db, tx, store;
    request.onupgradeneeded = function (e) {
      const db = request.result;
      db.createObjectStore("product", { keyPath: "_id" });
      db.createObjectStore("categories", { keyPath: "_id" });
      db.createObjectStore("cart", { keyPath: "_id" });
    };

    request.onerror = function (e) {
      console.log("There was an error");
    };

    request.onsuccess = function (e) {
      db = request.result;
      tx = db.transaction(storeName, "readwrite");
      store = tx.objectStore(storeName);

      tx.onerror = function (e) {
        console.log("Transaction error:", e.target.error);
        reject(e.target.error);
      };

      db.onerror = function (e) {
        console.log("error", e);
      };

      switch (method) {
        case "put":
          store.put(object);
          resolve(object);
          request.onerror = function (e) {
            console.log("Error putting item in IndexedDB", e);
            reject(e);
          };
          break;
        case "get":
          const all = store.getAll();
          all.onsuccess = function () {
            resolve(all.result);
          };
          break;
        case "delete":
          store.delete(object._id);
          break;
        default:
          console.log("No valid method");
          break;
      }

      tx.oncomplete = function () {
        db.close();
      };
    };
  });
}

export function mergeCarts(existingCart, newCart) {
  const mergedCart = [...existingCart];

  newCart.forEach((newCartItem) => {
    const existingCartItemIndex = existingCart.findIndex(
      (existingCartItem) => existingCartItem._id === newCartItem._id
    );

    if (existingCartItemIndex !== -1) {
      mergedCart[existingCartItemIndex].purchaseQuantity +=
        newCartItem.purchaseQuantity;
    } else {
      mergedCart.push(newCartItem);
    }
  });
  return mergedCart;
}