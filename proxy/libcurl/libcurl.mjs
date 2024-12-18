var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});

// node_modules/libcurl.js/libcurl_full.mjs
var libcurl = function() {
  var Module = typeof Module != "undefined" ? Module : {};
  var moduleOverrides = Object.assign({}, Module);
  var arguments_ = [];
  var thisProgram = "./this.program";
  var quit_ = (status, toThrow) => {
    throw toThrow;
  };
  var ENVIRONMENT_IS_WEB = typeof window == "object";
  var ENVIRONMENT_IS_WORKER = typeof importScripts == "function";
  var ENVIRONMENT_IS_NODE = typeof process == "object" && typeof process.versions == "object" && typeof process.versions.node == "string";
  var ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;
  if (Module["ENVIRONMENT"]) {
    throw new Error("Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -s ENVIRONMENT=web or -s ENVIRONMENT=node)");
  }
  var scriptDirectory = "";
  function locateFile(path) {
    if (Module["locateFile"]) {
      return Module["locateFile"](path, scriptDirectory);
    }
    return scriptDirectory + path;
  }
  var read_, readAsync, readBinary, setWindowTitle;
  function logExceptionOnExit(e) {
    if (e instanceof ExitStatus) return;
    let toLog = e;
    if (e && typeof e == "object" && e.stack) {
      toLog = [e, e.stack];
    }
    err("exiting due to exception: " + toLog);
  }
  if (ENVIRONMENT_IS_SHELL) {
    if (typeof process == "object" && typeof __require === "function" || typeof window == "object" || typeof importScripts == "function") throw new Error("not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)");
    if (typeof read != "undefined") {
      read_ = function shell_read(f) {
        const data = tryParseAsDataURI(f);
        if (data) {
          return intArrayToString(data);
        }
        return read(f);
      };
    }
    readBinary = function readBinary2(f) {
      let data;
      data = tryParseAsDataURI(f);
      if (data) {
        return data;
      }
      if (typeof readbuffer == "function") {
        return new Uint8Array(readbuffer(f));
      }
      data = read(f, "binary");
      assert(typeof data == "object");
      return data;
    };
    readAsync = function readAsync2(f, onload, onerror) {
      setTimeout(() => onload(readBinary(f)), 0);
    };
    if (typeof scriptArgs != "undefined") {
      arguments_ = scriptArgs;
    } else if (typeof arguments != "undefined") {
      arguments_ = arguments;
    }
    if (typeof quit == "function") {
      quit_ = (status, toThrow) => {
        logExceptionOnExit(toThrow);
        quit(status);
      };
    }
    if (typeof print != "undefined") {
      if (typeof console == "undefined") console = {};
      console.log = print;
      console.warn = console.error = typeof printErr != "undefined" ? printErr : print;
    }
  } else if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
    if (ENVIRONMENT_IS_WORKER) {
      scriptDirectory = self.location.href;
    } else if (typeof document != "undefined" && document.currentScript) {
      scriptDirectory = document.currentScript.src;
    }
    if (scriptDirectory.indexOf("blob:") !== 0) {
      scriptDirectory = scriptDirectory.substr(0, scriptDirectory.replace(/[?#].*/, "").lastIndexOf("/") + 1);
    } else {
      scriptDirectory = "";
    }
    if (!(typeof window == "object" || typeof importScripts == "function")) throw new Error("not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)");
    {
      read_ = (url) => {
        try {
          var xhr = new XMLHttpRequest();
          xhr.open("GET", url, false);
          xhr.send(null);
          return xhr.responseText;
        } catch (err2) {
          var data = tryParseAsDataURI(url);
          if (data) {
            return intArrayToString(data);
          }
          throw err2;
        }
      };
      if (ENVIRONMENT_IS_WORKER) {
        readBinary = (url) => {
          try {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url, false);
            xhr.responseType = "arraybuffer";
            xhr.send(null);
            return new Uint8Array(xhr.response);
          } catch (err2) {
            var data = tryParseAsDataURI(url);
            if (data) {
              return data;
            }
            throw err2;
          }
        };
      }
      readAsync = (url, onload, onerror) => {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.responseType = "arraybuffer";
        xhr.onload = () => {
          if (xhr.status == 200 || xhr.status == 0 && xhr.response) {
            onload(xhr.response);
            return;
          }
          var data = tryParseAsDataURI(url);
          if (data) {
            onload(data.buffer);
            return;
          }
          onerror();
        };
        xhr.onerror = onerror;
        xhr.send(null);
      };
    }
    setWindowTitle = (title) => document.title = title;
  } else {
    throw new Error("environment detection error");
  }
  var out = Module["print"] || console.log.bind(console);
  var err = Module["printErr"] || console.warn.bind(console);
  Object.assign(Module, moduleOverrides);
  moduleOverrides = null;
  if (Module["arguments"]) arguments_ = Module["arguments"];
  if (!Object.getOwnPropertyDescriptor(Module, "arguments")) {
    Object.defineProperty(Module, "arguments", { configurable: true, get: function() {
      abort("Module.arguments has been replaced with plain arguments_ (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)");
    } });
  }
  if (Module["thisProgram"]) thisProgram = Module["thisProgram"];
  if (!Object.getOwnPropertyDescriptor(Module, "thisProgram")) {
    Object.defineProperty(Module, "thisProgram", { configurable: true, get: function() {
      abort("Module.thisProgram has been replaced with plain thisProgram (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)");
    } });
  }
  if (Module["quit"]) quit_ = Module["quit"];
  if (!Object.getOwnPropertyDescriptor(Module, "quit")) {
    Object.defineProperty(Module, "quit", { configurable: true, get: function() {
      abort("Module.quit has been replaced with plain quit_ (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)");
    } });
  }
  assert(typeof Module["memoryInitializerPrefixURL"] == "undefined", "Module.memoryInitializerPrefixURL option was removed, use Module.locateFile instead");
  assert(typeof Module["pthreadMainPrefixURL"] == "undefined", "Module.pthreadMainPrefixURL option was removed, use Module.locateFile instead");
  assert(typeof Module["cdInitializerPrefixURL"] == "undefined", "Module.cdInitializerPrefixURL option was removed, use Module.locateFile instead");
  assert(typeof Module["filePackagePrefixURL"] == "undefined", "Module.filePackagePrefixURL option was removed, use Module.locateFile instead");
  assert(typeof Module["read"] == "undefined", "Module.read option was removed (modify read_ in JS)");
  assert(typeof Module["readAsync"] == "undefined", "Module.readAsync option was removed (modify readAsync in JS)");
  assert(typeof Module["readBinary"] == "undefined", "Module.readBinary option was removed (modify readBinary in JS)");
  assert(typeof Module["setWindowTitle"] == "undefined", "Module.setWindowTitle option was removed (modify setWindowTitle in JS)");
  assert(typeof Module["TOTAL_MEMORY"] == "undefined", "Module.TOTAL_MEMORY has been renamed Module.INITIAL_MEMORY");
  if (!Object.getOwnPropertyDescriptor(Module, "read")) {
    Object.defineProperty(Module, "read", { configurable: true, get: function() {
      abort("Module.read has been replaced with plain read_ (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)");
    } });
  }
  if (!Object.getOwnPropertyDescriptor(Module, "readAsync")) {
    Object.defineProperty(Module, "readAsync", { configurable: true, get: function() {
      abort("Module.readAsync has been replaced with plain readAsync (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)");
    } });
  }
  if (!Object.getOwnPropertyDescriptor(Module, "readBinary")) {
    Object.defineProperty(Module, "readBinary", { configurable: true, get: function() {
      abort("Module.readBinary has been replaced with plain readBinary (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)");
    } });
  }
  if (!Object.getOwnPropertyDescriptor(Module, "setWindowTitle")) {
    Object.defineProperty(Module, "setWindowTitle", { configurable: true, get: function() {
      abort("Module.setWindowTitle has been replaced with plain setWindowTitle (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)");
    } });
  }
  assert(!ENVIRONMENT_IS_NODE, "node environment detected but not enabled at build time.  Add 'node' to `-s ENVIRONMENT` to enable.");
  assert(!ENVIRONMENT_IS_SHELL, "shell environment detected but not enabled at build time.  Add 'shell' to `-s ENVIRONMENT` to enable.");
  var POINTER_SIZE = 4;
  function warnOnce(text) {
    if (!warnOnce.shown) warnOnce.shown = {};
    if (!warnOnce.shown[text]) {
      warnOnce.shown[text] = 1;
      err(text);
    }
  }
  function convertJsFunctionToWasm(func, sig) {
    if (typeof WebAssembly.Function == "function") {
      var typeNames = { "i": "i32", "j": "i64", "f": "f32", "d": "f64" };
      var type = { parameters: [], results: sig[0] == "v" ? [] : [typeNames[sig[0]]] };
      for (var i = 1; i < sig.length; ++i) {
        type.parameters.push(typeNames[sig[i]]);
      }
      return new WebAssembly.Function(type, func);
    }
    var typeSection = [1, 0, 1, 96];
    var sigRet = sig.slice(0, 1);
    var sigParam = sig.slice(1);
    var typeCodes = { "i": 127, "j": 126, "f": 125, "d": 124 };
    typeSection.push(sigParam.length);
    for (var i = 0; i < sigParam.length; ++i) {
      typeSection.push(typeCodes[sigParam[i]]);
    }
    if (sigRet == "v") {
      typeSection.push(0);
    } else {
      typeSection = typeSection.concat([1, typeCodes[sigRet]]);
    }
    typeSection[1] = typeSection.length - 2;
    var bytes = new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0].concat(typeSection, [2, 7, 1, 1, 101, 1, 102, 0, 0, 7, 5, 1, 1, 102, 0, 0]));
    var module = new WebAssembly.Module(bytes);
    var instance = new WebAssembly.Instance(module, { "e": { "f": func } });
    var wrappedFunc = instance.exports["f"];
    return wrappedFunc;
  }
  var freeTableIndexes = [];
  var functionsInTableMap;
  function getEmptyTableSlot() {
    if (freeTableIndexes.length) {
      return freeTableIndexes.pop();
    }
    try {
      wasmTable.grow(1);
    } catch (err2) {
      if (!(err2 instanceof RangeError)) {
        throw err2;
      }
      throw "Unable to grow wasm table. Set ALLOW_TABLE_GROWTH.";
    }
    return wasmTable.length - 1;
  }
  function updateTableMap(offset, count) {
    for (var i = offset; i < offset + count; i++) {
      var item = getWasmTableEntry(i);
      if (item) {
        functionsInTableMap.set(item, i);
      }
    }
  }
  function addFunction(func, sig) {
    assert(typeof func != "undefined");
    if (!functionsInTableMap) {
      functionsInTableMap = /* @__PURE__ */ new WeakMap();
      updateTableMap(0, wasmTable.length);
    }
    if (functionsInTableMap.has(func)) {
      return functionsInTableMap.get(func);
    }
    var ret = getEmptyTableSlot();
    try {
      setWasmTableEntry(ret, func);
    } catch (err2) {
      if (!(err2 instanceof TypeError)) {
        throw err2;
      }
      assert(typeof sig != "undefined", "Missing signature argument to addFunction: " + func);
      var wrapped = convertJsFunctionToWasm(func, sig);
      setWasmTableEntry(ret, wrapped);
    }
    functionsInTableMap.set(func, ret);
    return ret;
  }
  function removeFunction(index) {
    functionsInTableMap.delete(getWasmTableEntry(index));
    freeTableIndexes.push(index);
  }
  var tempRet0 = 0;
  var setTempRet0 = (value) => {
    tempRet0 = value;
  };
  var getTempRet0 = () => tempRet0;
  var wasmBinary;
  if (Module["wasmBinary"]) wasmBinary = Module["wasmBinary"];
  if (!Object.getOwnPropertyDescriptor(Module, "wasmBinary")) {
    Object.defineProperty(Module, "wasmBinary", { configurable: true, get: function() {
      abort("Module.wasmBinary has been replaced with plain wasmBinary (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)");
    } });
  }
  var noExitRuntime = Module["noExitRuntime"] || true;
  if (!Object.getOwnPropertyDescriptor(Module, "noExitRuntime")) {
    Object.defineProperty(Module, "noExitRuntime", { configurable: true, get: function() {
      abort("Module.noExitRuntime has been replaced with plain noExitRuntime (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)");
    } });
  }
  if (typeof WebAssembly != "object") {
    abort("no native wasm support detected");
  }
  var wasmMemory;
  var ABORT = false;
  var EXITSTATUS;
  function assert(condition, text) {
    if (!condition) {
      abort("Assertion failed" + (text ? ": " + text : ""));
    }
  }
  function getCFunc(ident) {
    var func = Module["_" + ident];
    assert(func, "Cannot call unknown function " + ident + ", make sure it is exported");
    return func;
  }
  function ccall(ident, returnType, argTypes, args, opts) {
    var toC = { "string": function(str) {
      var ret2 = 0;
      if (str !== null && str !== void 0 && str !== 0) {
        var len = (str.length << 2) + 1;
        ret2 = stackAlloc(len);
        stringToUTF8(str, ret2, len);
      }
      return ret2;
    }, "array": function(arr) {
      var ret2 = stackAlloc(arr.length);
      writeArrayToMemory(arr, ret2);
      return ret2;
    } };
    function convertReturnValue(ret2) {
      if (returnType === "string") return UTF8ToString(ret2);
      if (returnType === "boolean") return Boolean(ret2);
      return ret2;
    }
    var func = getCFunc(ident);
    var cArgs = [];
    var stack = 0;
    assert(returnType !== "array", 'Return type should not be "array".');
    if (args) {
      for (var i = 0; i < args.length; i++) {
        var converter = toC[argTypes[i]];
        if (converter) {
          if (stack === 0) stack = stackSave();
          cArgs[i] = converter(args[i]);
        } else {
          cArgs[i] = args[i];
        }
      }
    }
    var ret = func.apply(null, cArgs);
    function onDone(ret2) {
      if (stack !== 0) stackRestore(stack);
      return convertReturnValue(ret2);
    }
    ret = onDone(ret);
    return ret;
  }
  var ALLOC_NORMAL = 0;
  var ALLOC_STACK = 1;
  function allocate(slab, allocator) {
    var ret;
    assert(typeof allocator == "number", "allocate no longer takes a type argument");
    assert(typeof slab != "number", "allocate no longer takes a number as arg0");
    if (allocator == ALLOC_STACK) {
      ret = stackAlloc(slab.length);
    } else {
      ret = _malloc(slab.length);
    }
    if (!slab.subarray && !slab.slice) {
      slab = new Uint8Array(slab);
    }
    HEAPU8.set(slab, ret);
    return ret;
  }
  var UTF8Decoder = typeof TextDecoder != "undefined" ? new TextDecoder("utf8") : void 0;
  function UTF8ArrayToString(heap, idx, maxBytesToRead) {
    var endIdx = idx + maxBytesToRead;
    var endPtr = idx;
    while (heap[endPtr] && !(endPtr >= endIdx)) ++endPtr;
    if (endPtr - idx > 16 && heap.subarray && UTF8Decoder) {
      return UTF8Decoder.decode(heap.subarray(idx, endPtr));
    } else {
      var str = "";
      while (idx < endPtr) {
        var u0 = heap[idx++];
        if (!(u0 & 128)) {
          str += String.fromCharCode(u0);
          continue;
        }
        var u1 = heap[idx++] & 63;
        if ((u0 & 224) == 192) {
          str += String.fromCharCode((u0 & 31) << 6 | u1);
          continue;
        }
        var u2 = heap[idx++] & 63;
        if ((u0 & 240) == 224) {
          u0 = (u0 & 15) << 12 | u1 << 6 | u2;
        } else {
          if ((u0 & 248) != 240) warnOnce("Invalid UTF-8 leading byte 0x" + u0.toString(16) + " encountered when deserializing a UTF-8 string in wasm memory to a JS string!");
          u0 = (u0 & 7) << 18 | u1 << 12 | u2 << 6 | heap[idx++] & 63;
        }
        if (u0 < 65536) {
          str += String.fromCharCode(u0);
        } else {
          var ch = u0 - 65536;
          str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023);
        }
      }
    }
    return str;
  }
  function UTF8ToString(ptr, maxBytesToRead) {
    return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : "";
  }
  function stringToUTF8Array(str, heap, outIdx, maxBytesToWrite) {
    if (!(maxBytesToWrite > 0)) return 0;
    var startIdx = outIdx;
    var endIdx = outIdx + maxBytesToWrite - 1;
    for (var i = 0; i < str.length; ++i) {
      var u = str.charCodeAt(i);
      if (u >= 55296 && u <= 57343) {
        var u1 = str.charCodeAt(++i);
        u = 65536 + ((u & 1023) << 10) | u1 & 1023;
      }
      if (u <= 127) {
        if (outIdx >= endIdx) break;
        heap[outIdx++] = u;
      } else if (u <= 2047) {
        if (outIdx + 1 >= endIdx) break;
        heap[outIdx++] = 192 | u >> 6;
        heap[outIdx++] = 128 | u & 63;
      } else if (u <= 65535) {
        if (outIdx + 2 >= endIdx) break;
        heap[outIdx++] = 224 | u >> 12;
        heap[outIdx++] = 128 | u >> 6 & 63;
        heap[outIdx++] = 128 | u & 63;
      } else {
        if (outIdx + 3 >= endIdx) break;
        if (u > 1114111) warnOnce("Invalid Unicode code point 0x" + u.toString(16) + " encountered when serializing a JS string to a UTF-8 string in wasm memory! (Valid unicode code points should be in range 0-0x10FFFF).");
        heap[outIdx++] = 240 | u >> 18;
        heap[outIdx++] = 128 | u >> 12 & 63;
        heap[outIdx++] = 128 | u >> 6 & 63;
        heap[outIdx++] = 128 | u & 63;
      }
    }
    heap[outIdx] = 0;
    return outIdx - startIdx;
  }
  function stringToUTF8(str, outPtr, maxBytesToWrite) {
    assert(typeof maxBytesToWrite == "number", "stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!");
    return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);
  }
  function lengthBytesUTF8(str) {
    var len = 0;
    for (var i = 0; i < str.length; ++i) {
      var u = str.charCodeAt(i);
      if (u >= 55296 && u <= 57343) u = 65536 + ((u & 1023) << 10) | str.charCodeAt(++i) & 1023;
      if (u <= 127) ++len;
      else if (u <= 2047) len += 2;
      else if (u <= 65535) len += 3;
      else len += 4;
    }
    return len;
  }
  var UTF16Decoder = typeof TextDecoder != "undefined" ? new TextDecoder("utf-16le") : void 0;
  function allocateUTF8(str) {
    var size = lengthBytesUTF8(str) + 1;
    var ret = _malloc(size);
    if (ret) stringToUTF8Array(str, HEAP8, ret, size);
    return ret;
  }
  function writeArrayToMemory(array, buffer2) {
    assert(array.length >= 0, "writeArrayToMemory array must have a length (should be an array or typed array)");
    HEAP8.set(array, buffer2);
  }
  function writeAsciiToMemory(str, buffer2, dontAddNull) {
    for (var i = 0; i < str.length; ++i) {
      assert(str.charCodeAt(i) === (str.charCodeAt(i) & 255));
      HEAP8[buffer2++ >> 0] = str.charCodeAt(i);
    }
    if (!dontAddNull) HEAP8[buffer2 >> 0] = 0;
  }
  function alignUp(x, multiple) {
    if (x % multiple > 0) {
      x += multiple - x % multiple;
    }
    return x;
  }
  var buffer, HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64;
  function updateGlobalBufferAndViews(buf) {
    buffer = buf;
    Module["HEAP8"] = HEAP8 = new Int8Array(buf);
    Module["HEAP16"] = HEAP16 = new Int16Array(buf);
    Module["HEAP32"] = HEAP32 = new Int32Array(buf);
    Module["HEAPU8"] = HEAPU8 = new Uint8Array(buf);
    Module["HEAPU16"] = HEAPU16 = new Uint16Array(buf);
    Module["HEAPU32"] = HEAPU32 = new Uint32Array(buf);
    Module["HEAPF32"] = HEAPF32 = new Float32Array(buf);
    Module["HEAPF64"] = HEAPF64 = new Float64Array(buf);
  }
  var TOTAL_STACK = 5242880;
  if (Module["TOTAL_STACK"]) assert(TOTAL_STACK === Module["TOTAL_STACK"], "the stack size can no longer be determined at runtime");
  var INITIAL_MEMORY = Module["INITIAL_MEMORY"] || 16777216;
  if (!Object.getOwnPropertyDescriptor(Module, "INITIAL_MEMORY")) {
    Object.defineProperty(Module, "INITIAL_MEMORY", { configurable: true, get: function() {
      abort("Module.INITIAL_MEMORY has been replaced with plain INITIAL_MEMORY (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)");
    } });
  }
  assert(INITIAL_MEMORY >= TOTAL_STACK, "INITIAL_MEMORY should be larger than TOTAL_STACK, was " + INITIAL_MEMORY + "! (TOTAL_STACK=" + TOTAL_STACK + ")");
  assert(typeof Int32Array != "undefined" && typeof Float64Array !== "undefined" && Int32Array.prototype.subarray != void 0 && Int32Array.prototype.set != void 0, "JS engine does not provide full typed array support");
  assert(!Module["wasmMemory"], "Use of `wasmMemory` detected.  Use -s IMPORTED_MEMORY to define wasmMemory externally");
  assert(INITIAL_MEMORY == 16777216, "Detected runtime INITIAL_MEMORY setting.  Use -s IMPORTED_MEMORY to define wasmMemory dynamically");
  var wasmTable;
  function writeStackCookie() {
    var max = _emscripten_stack_get_end();
    assert((max & 3) == 0);
    HEAP32[max + 4 >> 2] = 34821223;
    HEAP32[max + 8 >> 2] = 2310721022;
    HEAP32[0] = 1668509029;
  }
  function checkStackCookie() {
    if (ABORT) return;
    var max = _emscripten_stack_get_end();
    var cookie1 = HEAPU32[max + 4 >> 2];
    var cookie2 = HEAPU32[max + 8 >> 2];
    if (cookie1 != 34821223 || cookie2 != 2310721022) {
      abort("Stack overflow! Stack cookie has been overwritten, expected hex dwords 0x89BACDFE and 0x2135467, but received 0x" + cookie2.toString(16) + " 0x" + cookie1.toString(16));
    }
    if (HEAP32[0] !== 1668509029) abort("Runtime error: The application has corrupted its heap memory area (address zero)!");
  }
  (function() {
    var h16 = new Int16Array(1);
    var h8 = new Int8Array(h16.buffer);
    h16[0] = 25459;
    if (h8[0] !== 115 || h8[1] !== 99) throw "Runtime error: expected the system to be little-endian! (Run with -s SUPPORT_BIG_ENDIAN=1 to bypass)";
  })();
  var __ATPRERUN__ = [];
  var __ATINIT__ = [];
  var __ATPOSTRUN__ = [];
  var runtimeInitialized = false;
  var runtimeExited = false;
  var runtimeKeepaliveCounter = 0;
  function keepRuntimeAlive() {
    return noExitRuntime || runtimeKeepaliveCounter > 0;
  }
  function preRun() {
    if (Module["preRun"]) {
      if (typeof Module["preRun"] == "function") Module["preRun"] = [Module["preRun"]];
      while (Module["preRun"].length) {
        addOnPreRun(Module["preRun"].shift());
      }
    }
    callRuntimeCallbacks(__ATPRERUN__);
  }
  function initRuntime() {
    checkStackCookie();
    assert(!runtimeInitialized);
    runtimeInitialized = true;
    SOCKFS.root = FS.mount(SOCKFS, {}, null);
    if (!Module["noFSInit"] && !FS.init.initialized) FS.init();
    FS.ignorePermissions = false;
    TTY.init();
    PIPEFS.root = FS.mount(PIPEFS, {}, null);
    callRuntimeCallbacks(__ATINIT__);
  }
  function exitRuntime() {
    checkStackCookie();
    runtimeExited = true;
  }
  function postRun() {
    checkStackCookie();
    if (Module["postRun"]) {
      if (typeof Module["postRun"] == "function") Module["postRun"] = [Module["postRun"]];
      while (Module["postRun"].length) {
        addOnPostRun(Module["postRun"].shift());
      }
    }
    callRuntimeCallbacks(__ATPOSTRUN__);
  }
  function addOnPreRun(cb) {
    __ATPRERUN__.unshift(cb);
  }
  function addOnInit(cb) {
    __ATINIT__.unshift(cb);
  }
  function addOnPostRun(cb) {
    __ATPOSTRUN__.unshift(cb);
  }
  assert(Math.imul, "This browser does not support Math.imul(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");
  assert(Math.fround, "This browser does not support Math.fround(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");
  assert(Math.clz32, "This browser does not support Math.clz32(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");
  assert(Math.trunc, "This browser does not support Math.trunc(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");
  var runDependencies = 0;
  var runDependencyWatcher = null;
  var dependenciesFulfilled = null;
  var runDependencyTracking = {};
  function getUniqueRunDependency(id) {
    var orig = id;
    while (1) {
      if (!runDependencyTracking[id]) return id;
      id = orig + Math.random();
    }
  }
  function addRunDependency(id) {
    runDependencies++;
    if (Module["monitorRunDependencies"]) {
      Module["monitorRunDependencies"](runDependencies);
    }
    if (id) {
      assert(!runDependencyTracking[id]);
      runDependencyTracking[id] = 1;
      if (runDependencyWatcher === null && typeof setInterval != "undefined") {
        runDependencyWatcher = setInterval(function() {
          if (ABORT) {
            clearInterval(runDependencyWatcher);
            runDependencyWatcher = null;
            return;
          }
          var shown = false;
          for (var dep in runDependencyTracking) {
            if (!shown) {
              shown = true;
              err("still waiting on run dependencies:");
            }
            err("dependency: " + dep);
          }
          if (shown) {
            err("(end of list)");
          }
        }, 1e4);
      }
    } else {
      err("warning: run dependency added without ID");
    }
  }
  function removeRunDependency(id) {
    runDependencies--;
    if (Module["monitorRunDependencies"]) {
      Module["monitorRunDependencies"](runDependencies);
    }
    if (id) {
      assert(runDependencyTracking[id]);
      delete runDependencyTracking[id];
    } else {
      err("warning: run dependency removed without ID");
    }
    if (runDependencies == 0) {
      if (runDependencyWatcher !== null) {
        clearInterval(runDependencyWatcher);
        runDependencyWatcher = null;
      }
      if (dependenciesFulfilled) {
        var callback = dependenciesFulfilled;
        dependenciesFulfilled = null;
        callback();
      }
    }
  }
  Module["preloadedImages"] = {};
  Module["preloadedAudios"] = {};
  function abort(what) {
    {
      if (Module["onAbort"]) {
        Module["onAbort"](what);
      }
    }
    what = "Aborted(" + what + ")";
    err(what);
    ABORT = true;
    EXITSTATUS = 1;
    var e = new WebAssembly.RuntimeError(what);
    throw e;
  }
  var dataURIPrefix = "data:application/octet-stream;base64,";
  function isDataURI(filename) {
    return filename.startsWith(dataURIPrefix);
  }
  function isFileURI(filename) {
    return filename.startsWith("file://");
  }
  function createExportWrapper(name, fixedasm) {
    return function() {
      var displayName = name;
      var asm2 = fixedasm;
      if (!fixedasm) {
        asm2 = Module["asm"];
      }
      assert(runtimeInitialized, "native function `" + displayName + "` called before runtime initialization");
      assert(!runtimeExited, "native function `" + displayName + "` called after runtime exit (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
      if (!asm2[name]) {
        assert(asm2[name], "exported native function `" + displayName + "` not found");
      }
      return asm2[name].apply(null, arguments);
    };
  }
  var wasmBinaryFile;
  if (!isDataURI(wasmBinaryFile)) {
    wasmBinaryFile = locateFile(wasmBinaryFile);
  }
  function getBinary(file) {
    try {
      if (file == wasmBinaryFile && wasmBinary) {
        return new Uint8Array(wasmBinary);
      }
      var binary = tryParseAsDataURI(file);
      if (binary) {
        return binary;
      }
      if (readBinary) {
        return readBinary(file);
      } else {
        throw "both async and sync fetching of the wasm failed";
      }
    } catch (err2) {
      abort(err2);
    }
  }
  function getBinaryPromise() {
    if (!wasmBinary && (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER)) {
      if (typeof fetch == "function") {
        return fetch(wasmBinaryFile, { credentials: "same-origin" }).then(function(response) {
          if (!response["ok"]) {
            throw "failed to load wasm binary file at '" + wasmBinaryFile + "'";
          }
          return response["arrayBuffer"]();
        }).catch(function() {
          return getBinary(wasmBinaryFile);
        });
      }
    }
    return Promise.resolve().then(function() {
      return getBinary(wasmBinaryFile);
    });
  }
  function createWasm() {
    var info = { "env": asmLibraryArg, "wasi_snapshot_preview1": asmLibraryArg };
    function receiveInstance(instance, module) {
      var exports2 = instance.exports;
      Module["asm"] = exports2;
      wasmMemory = Module["asm"]["memory"];
      assert(wasmMemory, "memory not found in wasm exports");
      updateGlobalBufferAndViews(wasmMemory.buffer);
      wasmTable = Module["asm"]["__indirect_function_table"];
      assert(wasmTable, "table not found in wasm exports");
      addOnInit(Module["asm"]["__wasm_call_ctors"]);
      removeRunDependency("wasm-instantiate");
    }
    addRunDependency("wasm-instantiate");
    var trueModule = Module;
    function receiveInstantiationResult(result) {
      assert(Module === trueModule, "the Module object should not be replaced during async compilation - perhaps the order of HTML elements is wrong?");
      trueModule = null;
      receiveInstance(result["instance"]);
    }
    function instantiateArrayBuffer(receiver) {
      return getBinaryPromise().then(function(binary) {
        return WebAssembly.instantiate(binary, info);
      }).then(function(instance) {
        return instance;
      }).then(receiver, function(reason) {
        err("failed to asynchronously prepare wasm: " + reason);
        if (isFileURI(wasmBinaryFile)) {
          err("warning: Loading from a file URI (" + wasmBinaryFile + ") is not supported in most browsers. See https://emscripten.org/docs/getting_started/FAQ.html#how-do-i-run-a-local-webserver-for-testing-why-does-my-program-stall-in-downloading-or-preparing");
        }
        abort(reason);
      });
    }
    function instantiateAsync() {
      if (!wasmBinary && typeof WebAssembly.instantiateStreaming == "function" && !isDataURI(wasmBinaryFile) && typeof fetch == "function") {
        return fetch(wasmBinaryFile, { credentials: "same-origin" }).then(function(response) {
          var result = WebAssembly.instantiateStreaming(response, info);
          return result.then(receiveInstantiationResult, function(reason) {
            err("wasm streaming compile failed: " + reason);
            err("falling back to ArrayBuffer instantiation");
            return instantiateArrayBuffer(receiveInstantiationResult);
          });
        });
      } else {
        return instantiateArrayBuffer(receiveInstantiationResult);
      }
    }
    if (Module["instantiateWasm"]) {
      try {
        var exports = Module["instantiateWasm"](info, receiveInstance);
        return exports;
      } catch (e) {
        err("Module.instantiateWasm callback failed with error: " + e);
        return false;
      }
    }
    instantiateAsync();
    return {};
  }
  var tempDouble;
  var tempI64;
  function callRuntimeCallbacks(callbacks) {
    while (callbacks.length > 0) {
      var callback = callbacks.shift();
      if (typeof callback == "function") {
        callback(Module);
        continue;
      }
      var func = callback.func;
      if (typeof func == "number") {
        if (callback.arg === void 0) {
          getWasmTableEntry(func)();
        } else {
          getWasmTableEntry(func)(callback.arg);
        }
      } else {
        func(callback.arg === void 0 ? null : callback.arg);
      }
    }
  }
  function demangle(func) {
    warnOnce("warning: build with  -s DEMANGLE_SUPPORT=1  to link in libcxxabi demangling");
    return func;
  }
  function demangleAll(text) {
    var regex = /\b_Z[\w\d_]+/g;
    return text.replace(regex, function(x) {
      var y = demangle(x);
      return x === y ? x : y + " [" + x + "]";
    });
  }
  function getWasmTableEntry(funcPtr) {
    return wasmTable.get(funcPtr);
  }
  function handleException(e) {
    if (e instanceof ExitStatus || e == "unwind") {
      return EXITSTATUS;
    }
    quit_(1, e);
  }
  function jsStackTrace() {
    var error = new Error();
    if (!error.stack) {
      try {
        throw new Error();
      } catch (e) {
        error = e;
      }
      if (!error.stack) {
        return "(no stack trace available)";
      }
    }
    return error.stack.toString();
  }
  function setWasmTableEntry(idx, func) {
    wasmTable.set(idx, func);
  }
  function ___assert_fail(condition, filename, line, func) {
    abort("Assertion failed: " + UTF8ToString(condition) + ", at: " + [filename ? UTF8ToString(filename) : "unknown filename", line, func ? UTF8ToString(func) : "unknown function"]);
  }
  function ___call_sighandler(fp, sig) {
    getWasmTableEntry(fp)(sig);
  }
  function getRandomDevice() {
    if (typeof crypto == "object" && typeof crypto["getRandomValues"] == "function") {
      var randomBuffer = new Uint8Array(1);
      return function() {
        crypto.getRandomValues(randomBuffer);
        return randomBuffer[0];
      };
    } else return function() {
      abort("no cryptographic support found for randomDevice. consider polyfilling it if you want to use something insecure like Math.random(), e.g. put this in a --pre-js: var crypto = { getRandomValues: function(array) { for (var i = 0; i < array.length; i++) array[i] = (Math.random()*256)|0 } };");
    };
  }
  var PATH = { splitPath: function(filename) {
    var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
    return splitPathRe.exec(filename).slice(1);
  }, normalizeArray: function(parts, allowAboveRoot) {
    var up = 0;
    for (var i = parts.length - 1; i >= 0; i--) {
      var last = parts[i];
      if (last === ".") {
        parts.splice(i, 1);
      } else if (last === "..") {
        parts.splice(i, 1);
        up++;
      } else if (up) {
        parts.splice(i, 1);
        up--;
      }
    }
    if (allowAboveRoot) {
      for (; up; up--) {
        parts.unshift("..");
      }
    }
    return parts;
  }, normalize: function(path) {
    var isAbsolute = path.charAt(0) === "/", trailingSlash = path.substr(-1) === "/";
    path = PATH.normalizeArray(path.split("/").filter(function(p) {
      return !!p;
    }), !isAbsolute).join("/");
    if (!path && !isAbsolute) {
      path = ".";
    }
    if (path && trailingSlash) {
      path += "/";
    }
    return (isAbsolute ? "/" : "") + path;
  }, dirname: function(path) {
    var result = PATH.splitPath(path), root = result[0], dir = result[1];
    if (!root && !dir) {
      return ".";
    }
    if (dir) {
      dir = dir.substr(0, dir.length - 1);
    }
    return root + dir;
  }, basename: function(path) {
    if (path === "/") return "/";
    path = PATH.normalize(path);
    path = path.replace(/\/$/, "");
    var lastSlash = path.lastIndexOf("/");
    if (lastSlash === -1) return path;
    return path.substr(lastSlash + 1);
  }, extname: function(path) {
    return PATH.splitPath(path)[3];
  }, join: function() {
    var paths = Array.prototype.slice.call(arguments, 0);
    return PATH.normalize(paths.join("/"));
  }, join2: function(l, r) {
    return PATH.normalize(l + "/" + r);
  } };
  var PATH_FS = { resolve: function() {
    var resolvedPath = "", resolvedAbsolute = false;
    for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
      var path = i >= 0 ? arguments[i] : FS.cwd();
      if (typeof path != "string") {
        throw new TypeError("Arguments to path.resolve must be strings");
      } else if (!path) {
        return "";
      }
      resolvedPath = path + "/" + resolvedPath;
      resolvedAbsolute = path.charAt(0) === "/";
    }
    resolvedPath = PATH.normalizeArray(resolvedPath.split("/").filter(function(p) {
      return !!p;
    }), !resolvedAbsolute).join("/");
    return (resolvedAbsolute ? "/" : "") + resolvedPath || ".";
  }, relative: function(from, to) {
    from = PATH_FS.resolve(from).substr(1);
    to = PATH_FS.resolve(to).substr(1);
    function trim(arr) {
      var start = 0;
      for (; start < arr.length; start++) {
        if (arr[start] !== "") break;
      }
      var end = arr.length - 1;
      for (; end >= 0; end--) {
        if (arr[end] !== "") break;
      }
      if (start > end) return [];
      return arr.slice(start, end - start + 1);
    }
    var fromParts = trim(from.split("/"));
    var toParts = trim(to.split("/"));
    var length = Math.min(fromParts.length, toParts.length);
    var samePartsLength = length;
    for (var i = 0; i < length; i++) {
      if (fromParts[i] !== toParts[i]) {
        samePartsLength = i;
        break;
      }
    }
    var outputParts = [];
    for (var i = samePartsLength; i < fromParts.length; i++) {
      outputParts.push("..");
    }
    outputParts = outputParts.concat(toParts.slice(samePartsLength));
    return outputParts.join("/");
  } };
  var TTY = { ttys: [], init: function() {
  }, shutdown: function() {
  }, register: function(dev, ops) {
    TTY.ttys[dev] = { input: [], output: [], ops };
    FS.registerDevice(dev, TTY.stream_ops);
  }, stream_ops: { open: function(stream) {
    var tty = TTY.ttys[stream.node.rdev];
    if (!tty) {
      throw new FS.ErrnoError(43);
    }
    stream.tty = tty;
    stream.seekable = false;
  }, close: function(stream) {
    stream.tty.ops.flush(stream.tty);
  }, flush: function(stream) {
    stream.tty.ops.flush(stream.tty);
  }, read: function(stream, buffer2, offset, length, pos) {
    if (!stream.tty || !stream.tty.ops.get_char) {
      throw new FS.ErrnoError(60);
    }
    var bytesRead = 0;
    for (var i = 0; i < length; i++) {
      var result;
      try {
        result = stream.tty.ops.get_char(stream.tty);
      } catch (e) {
        throw new FS.ErrnoError(29);
      }
      if (result === void 0 && bytesRead === 0) {
        throw new FS.ErrnoError(6);
      }
      if (result === null || result === void 0) break;
      bytesRead++;
      buffer2[offset + i] = result;
    }
    if (bytesRead) {
      stream.node.timestamp = Date.now();
    }
    return bytesRead;
  }, write: function(stream, buffer2, offset, length, pos) {
    if (!stream.tty || !stream.tty.ops.put_char) {
      throw new FS.ErrnoError(60);
    }
    try {
      for (var i = 0; i < length; i++) {
        stream.tty.ops.put_char(stream.tty, buffer2[offset + i]);
      }
    } catch (e) {
      throw new FS.ErrnoError(29);
    }
    if (length) {
      stream.node.timestamp = Date.now();
    }
    return i;
  } }, default_tty_ops: { get_char: function(tty) {
    if (!tty.input.length) {
      var result = null;
      if (typeof window != "undefined" && typeof window.prompt == "function") {
        result = window.prompt("Input: ");
        if (result !== null) {
          result += "\n";
        }
      } else if (typeof readline == "function") {
        result = readline();
        if (result !== null) {
          result += "\n";
        }
      }
      if (!result) {
        return null;
      }
      tty.input = intArrayFromString(result, true);
    }
    return tty.input.shift();
  }, put_char: function(tty, val) {
    if (val === null || val === 10) {
      out(UTF8ArrayToString(tty.output, 0));
      tty.output = [];
    } else {
      if (val != 0) tty.output.push(val);
    }
  }, flush: function(tty) {
    if (tty.output && tty.output.length > 0) {
      out(UTF8ArrayToString(tty.output, 0));
      tty.output = [];
    }
  } }, default_tty1_ops: { put_char: function(tty, val) {
    if (val === null || val === 10) {
      err(UTF8ArrayToString(tty.output, 0));
      tty.output = [];
    } else {
      if (val != 0) tty.output.push(val);
    }
  }, flush: function(tty) {
    if (tty.output && tty.output.length > 0) {
      err(UTF8ArrayToString(tty.output, 0));
      tty.output = [];
    }
  } } };
  function zeroMemory(address, size) {
    HEAPU8.fill(0, address, address + size);
  }
  function mmapAlloc(size) {
    abort("internal error: mmapAlloc called but `emscripten_builtin_memalign` native symbol not exported");
  }
  var MEMFS = { ops_table: null, mount: function(mount) {
    return MEMFS.createNode(null, "/", 16384 | 511, 0);
  }, createNode: function(parent, name, mode, dev) {
    if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
      throw new FS.ErrnoError(63);
    }
    if (!MEMFS.ops_table) {
      MEMFS.ops_table = { dir: { node: { getattr: MEMFS.node_ops.getattr, setattr: MEMFS.node_ops.setattr, lookup: MEMFS.node_ops.lookup, mknod: MEMFS.node_ops.mknod, rename: MEMFS.node_ops.rename, unlink: MEMFS.node_ops.unlink, rmdir: MEMFS.node_ops.rmdir, readdir: MEMFS.node_ops.readdir, symlink: MEMFS.node_ops.symlink }, stream: { llseek: MEMFS.stream_ops.llseek } }, file: { node: { getattr: MEMFS.node_ops.getattr, setattr: MEMFS.node_ops.setattr }, stream: { llseek: MEMFS.stream_ops.llseek, read: MEMFS.stream_ops.read, write: MEMFS.stream_ops.write, allocate: MEMFS.stream_ops.allocate, mmap: MEMFS.stream_ops.mmap, msync: MEMFS.stream_ops.msync } }, link: { node: { getattr: MEMFS.node_ops.getattr, setattr: MEMFS.node_ops.setattr, readlink: MEMFS.node_ops.readlink }, stream: {} }, chrdev: { node: { getattr: MEMFS.node_ops.getattr, setattr: MEMFS.node_ops.setattr }, stream: FS.chrdev_stream_ops } };
    }
    var node = FS.createNode(parent, name, mode, dev);
    if (FS.isDir(node.mode)) {
      node.node_ops = MEMFS.ops_table.dir.node;
      node.stream_ops = MEMFS.ops_table.dir.stream;
      node.contents = {};
    } else if (FS.isFile(node.mode)) {
      node.node_ops = MEMFS.ops_table.file.node;
      node.stream_ops = MEMFS.ops_table.file.stream;
      node.usedBytes = 0;
      node.contents = null;
    } else if (FS.isLink(node.mode)) {
      node.node_ops = MEMFS.ops_table.link.node;
      node.stream_ops = MEMFS.ops_table.link.stream;
    } else if (FS.isChrdev(node.mode)) {
      node.node_ops = MEMFS.ops_table.chrdev.node;
      node.stream_ops = MEMFS.ops_table.chrdev.stream;
    }
    node.timestamp = Date.now();
    if (parent) {
      parent.contents[name] = node;
      parent.timestamp = node.timestamp;
    }
    return node;
  }, getFileDataAsTypedArray: function(node) {
    if (!node.contents) return new Uint8Array(0);
    if (node.contents.subarray) return node.contents.subarray(0, node.usedBytes);
    return new Uint8Array(node.contents);
  }, expandFileStorage: function(node, newCapacity) {
    var prevCapacity = node.contents ? node.contents.length : 0;
    if (prevCapacity >= newCapacity) return;
    var CAPACITY_DOUBLING_MAX = 1024 * 1024;
    newCapacity = Math.max(newCapacity, prevCapacity * (prevCapacity < CAPACITY_DOUBLING_MAX ? 2 : 1.125) >>> 0);
    if (prevCapacity != 0) newCapacity = Math.max(newCapacity, 256);
    var oldContents = node.contents;
    node.contents = new Uint8Array(newCapacity);
    if (node.usedBytes > 0) node.contents.set(oldContents.subarray(0, node.usedBytes), 0);
  }, resizeFileStorage: function(node, newSize) {
    if (node.usedBytes == newSize) return;
    if (newSize == 0) {
      node.contents = null;
      node.usedBytes = 0;
    } else {
      var oldContents = node.contents;
      node.contents = new Uint8Array(newSize);
      if (oldContents) {
        node.contents.set(oldContents.subarray(0, Math.min(newSize, node.usedBytes)));
      }
      node.usedBytes = newSize;
    }
  }, node_ops: { getattr: function(node) {
    var attr = {};
    attr.dev = FS.isChrdev(node.mode) ? node.id : 1;
    attr.ino = node.id;
    attr.mode = node.mode;
    attr.nlink = 1;
    attr.uid = 0;
    attr.gid = 0;
    attr.rdev = node.rdev;
    if (FS.isDir(node.mode)) {
      attr.size = 4096;
    } else if (FS.isFile(node.mode)) {
      attr.size = node.usedBytes;
    } else if (FS.isLink(node.mode)) {
      attr.size = node.link.length;
    } else {
      attr.size = 0;
    }
    attr.atime = new Date(node.timestamp);
    attr.mtime = new Date(node.timestamp);
    attr.ctime = new Date(node.timestamp);
    attr.blksize = 4096;
    attr.blocks = Math.ceil(attr.size / attr.blksize);
    return attr;
  }, setattr: function(node, attr) {
    if (attr.mode !== void 0) {
      node.mode = attr.mode;
    }
    if (attr.timestamp !== void 0) {
      node.timestamp = attr.timestamp;
    }
    if (attr.size !== void 0) {
      MEMFS.resizeFileStorage(node, attr.size);
    }
  }, lookup: function(parent, name) {
    throw FS.genericErrors[44];
  }, mknod: function(parent, name, mode, dev) {
    return MEMFS.createNode(parent, name, mode, dev);
  }, rename: function(old_node, new_dir, new_name) {
    if (FS.isDir(old_node.mode)) {
      var new_node;
      try {
        new_node = FS.lookupNode(new_dir, new_name);
      } catch (e) {
      }
      if (new_node) {
        for (var i in new_node.contents) {
          throw new FS.ErrnoError(55);
        }
      }
    }
    delete old_node.parent.contents[old_node.name];
    old_node.parent.timestamp = Date.now();
    old_node.name = new_name;
    new_dir.contents[new_name] = old_node;
    new_dir.timestamp = old_node.parent.timestamp;
    old_node.parent = new_dir;
  }, unlink: function(parent, name) {
    delete parent.contents[name];
    parent.timestamp = Date.now();
  }, rmdir: function(parent, name) {
    var node = FS.lookupNode(parent, name);
    for (var i in node.contents) {
      throw new FS.ErrnoError(55);
    }
    delete parent.contents[name];
    parent.timestamp = Date.now();
  }, readdir: function(node) {
    var entries = [".", ".."];
    for (var key in node.contents) {
      if (!node.contents.hasOwnProperty(key)) {
        continue;
      }
      entries.push(key);
    }
    return entries;
  }, symlink: function(parent, newname, oldpath) {
    var node = MEMFS.createNode(parent, newname, 511 | 40960, 0);
    node.link = oldpath;
    return node;
  }, readlink: function(node) {
    if (!FS.isLink(node.mode)) {
      throw new FS.ErrnoError(28);
    }
    return node.link;
  } }, stream_ops: { read: function(stream, buffer2, offset, length, position) {
    var contents = stream.node.contents;
    if (position >= stream.node.usedBytes) return 0;
    var size = Math.min(stream.node.usedBytes - position, length);
    assert(size >= 0);
    if (size > 8 && contents.subarray) {
      buffer2.set(contents.subarray(position, position + size), offset);
    } else {
      for (var i = 0; i < size; i++) buffer2[offset + i] = contents[position + i];
    }
    return size;
  }, write: function(stream, buffer2, offset, length, position, canOwn) {
    assert(!(buffer2 instanceof ArrayBuffer));
    if (buffer2.buffer === HEAP8.buffer) {
      canOwn = false;
    }
    if (!length) return 0;
    var node = stream.node;
    node.timestamp = Date.now();
    if (buffer2.subarray && (!node.contents || node.contents.subarray)) {
      if (canOwn) {
        assert(position === 0, "canOwn must imply no weird position inside the file");
        node.contents = buffer2.subarray(offset, offset + length);
        node.usedBytes = length;
        return length;
      } else if (node.usedBytes === 0 && position === 0) {
        node.contents = buffer2.slice(offset, offset + length);
        node.usedBytes = length;
        return length;
      } else if (position + length <= node.usedBytes) {
        node.contents.set(buffer2.subarray(offset, offset + length), position);
        return length;
      }
    }
    MEMFS.expandFileStorage(node, position + length);
    if (node.contents.subarray && buffer2.subarray) {
      node.contents.set(buffer2.subarray(offset, offset + length), position);
    } else {
      for (var i = 0; i < length; i++) {
        node.contents[position + i] = buffer2[offset + i];
      }
    }
    node.usedBytes = Math.max(node.usedBytes, position + length);
    return length;
  }, llseek: function(stream, offset, whence) {
    var position = offset;
    if (whence === 1) {
      position += stream.position;
    } else if (whence === 2) {
      if (FS.isFile(stream.node.mode)) {
        position += stream.node.usedBytes;
      }
    }
    if (position < 0) {
      throw new FS.ErrnoError(28);
    }
    return position;
  }, allocate: function(stream, offset, length) {
    MEMFS.expandFileStorage(stream.node, offset + length);
    stream.node.usedBytes = Math.max(stream.node.usedBytes, offset + length);
  }, mmap: function(stream, address, length, position, prot, flags) {
    if (address !== 0) {
      throw new FS.ErrnoError(28);
    }
    if (!FS.isFile(stream.node.mode)) {
      throw new FS.ErrnoError(43);
    }
    var ptr;
    var allocated;
    var contents = stream.node.contents;
    if (!(flags & 2) && contents.buffer === buffer) {
      allocated = false;
      ptr = contents.byteOffset;
    } else {
      if (position > 0 || position + length < contents.length) {
        if (contents.subarray) {
          contents = contents.subarray(position, position + length);
        } else {
          contents = Array.prototype.slice.call(contents, position, position + length);
        }
      }
      allocated = true;
      ptr = mmapAlloc(length);
      if (!ptr) {
        throw new FS.ErrnoError(48);
      }
      HEAP8.set(contents, ptr);
    }
    return { ptr, allocated };
  }, msync: function(stream, buffer2, offset, length, mmapFlags) {
    if (!FS.isFile(stream.node.mode)) {
      throw new FS.ErrnoError(43);
    }
    if (mmapFlags & 2) {
      return 0;
    }
    var bytesWritten = MEMFS.stream_ops.write(stream, buffer2, 0, length, offset, false);
    return 0;
  } } };
  function asyncLoad(url, onload, onerror, noRunDep) {
    var dep = !noRunDep ? getUniqueRunDependency("al " + url) : "";
    readAsync(url, function(arrayBuffer) {
      assert(arrayBuffer, 'Loading data file "' + url + '" failed (no arrayBuffer).');
      onload(new Uint8Array(arrayBuffer));
      if (dep) removeRunDependency(dep);
    }, function(event) {
      if (onerror) {
        onerror();
      } else {
        throw 'Loading data file "' + url + '" failed.';
      }
    });
    if (dep) addRunDependency(dep);
  }
  var ERRNO_MESSAGES = { 0: "Success", 1: "Arg list too long", 2: "Permission denied", 3: "Address already in use", 4: "Address not available", 5: "Address family not supported by protocol family", 6: "No more processes", 7: "Socket already connected", 8: "Bad file number", 9: "Trying to read unreadable message", 10: "Mount device busy", 11: "Operation canceled", 12: "No children", 13: "Connection aborted", 14: "Connection refused", 15: "Connection reset by peer", 16: "File locking deadlock error", 17: "Destination address required", 18: "Math arg out of domain of func", 19: "Quota exceeded", 20: "File exists", 21: "Bad address", 22: "File too large", 23: "Host is unreachable", 24: "Identifier removed", 25: "Illegal byte sequence", 26: "Connection already in progress", 27: "Interrupted system call", 28: "Invalid argument", 29: "I/O error", 30: "Socket is already connected", 31: "Is a directory", 32: "Too many symbolic links", 33: "Too many open files", 34: "Too many links", 35: "Message too long", 36: "Multihop attempted", 37: "File or path name too long", 38: "Network interface is not configured", 39: "Connection reset by network", 40: "Network is unreachable", 41: "Too many open files in system", 42: "No buffer space available", 43: "No such device", 44: "No such file or directory", 45: "Exec format error", 46: "No record locks available", 47: "The link has been severed", 48: "Not enough core", 49: "No message of desired type", 50: "Protocol not available", 51: "No space left on device", 52: "Function not implemented", 53: "Socket is not connected", 54: "Not a directory", 55: "Directory not empty", 56: "State not recoverable", 57: "Socket operation on non-socket", 59: "Not a typewriter", 60: "No such device or address", 61: "Value too large for defined data type", 62: "Previous owner died", 63: "Not super-user", 64: "Broken pipe", 65: "Protocol error", 66: "Unknown protocol", 67: "Protocol wrong type for socket", 68: "Math result not representable", 69: "Read only file system", 70: "Illegal seek", 71: "No such process", 72: "Stale file handle", 73: "Connection timed out", 74: "Text file busy", 75: "Cross-device link", 100: "Device not a stream", 101: "Bad font file fmt", 102: "Invalid slot", 103: "Invalid request code", 104: "No anode", 105: "Block device required", 106: "Channel number out of range", 107: "Level 3 halted", 108: "Level 3 reset", 109: "Link number out of range", 110: "Protocol driver not attached", 111: "No CSI structure available", 112: "Level 2 halted", 113: "Invalid exchange", 114: "Invalid request descriptor", 115: "Exchange full", 116: "No data (for no delay io)", 117: "Timer expired", 118: "Out of streams resources", 119: "Machine is not on the network", 120: "Package not installed", 121: "The object is remote", 122: "Advertise error", 123: "Srmount error", 124: "Communication error on send", 125: "Cross mount point (not really error)", 126: "Given log. name not unique", 127: "f.d. invalid for this operation", 128: "Remote address changed", 129: "Can   access a needed shared lib", 130: "Accessing a corrupted shared lib", 131: ".lib section in a.out corrupted", 132: "Attempting to link in too many libs", 133: "Attempting to exec a shared library", 135: "Streams pipe error", 136: "Too many users", 137: "Socket type not supported", 138: "Not supported", 139: "Protocol family not supported", 140: "Can't send after socket shutdown", 141: "Too many references", 142: "Host is down", 148: "No medium (in tape drive)", 156: "Level 2 not synchronized" };
  var ERRNO_CODES = {};
  var FS = { root: null, mounts: [], devices: {}, streams: [], nextInode: 1, nameTable: null, currentPath: "/", initialized: false, ignorePermissions: true, ErrnoError: null, genericErrors: {}, filesystems: null, syncFSRequests: 0, lookupPath: (path, opts = {}) => {
    path = PATH_FS.resolve(FS.cwd(), path);
    if (!path) return { path: "", node: null };
    var defaults = { follow_mount: true, recurse_count: 0 };
    for (var key in defaults) {
      if (opts[key] === void 0) {
        opts[key] = defaults[key];
      }
    }
    if (opts.recurse_count > 8) {
      throw new FS.ErrnoError(32);
    }
    var parts = PATH.normalizeArray(path.split("/").filter((p) => !!p), false);
    var current = FS.root;
    var current_path = "/";
    for (var i = 0; i < parts.length; i++) {
      var islast = i === parts.length - 1;
      if (islast && opts.parent) {
        break;
      }
      current = FS.lookupNode(current, parts[i]);
      current_path = PATH.join2(current_path, parts[i]);
      if (FS.isMountpoint(current)) {
        if (!islast || islast && opts.follow_mount) {
          current = current.mounted.root;
        }
      }
      if (!islast || opts.follow) {
        var count = 0;
        while (FS.isLink(current.mode)) {
          var link = FS.readlink(current_path);
          current_path = PATH_FS.resolve(PATH.dirname(current_path), link);
          var lookup = FS.lookupPath(current_path, { recurse_count: opts.recurse_count });
          current = lookup.node;
          if (count++ > 40) {
            throw new FS.ErrnoError(32);
          }
        }
      }
    }
    return { path: current_path, node: current };
  }, getPath: (node) => {
    var path;
    while (true) {
      if (FS.isRoot(node)) {
        var mount = node.mount.mountpoint;
        if (!path) return mount;
        return mount[mount.length - 1] !== "/" ? mount + "/" + path : mount + path;
      }
      path = path ? node.name + "/" + path : node.name;
      node = node.parent;
    }
  }, hashName: (parentid, name) => {
    var hash = 0;
    for (var i = 0; i < name.length; i++) {
      hash = (hash << 5) - hash + name.charCodeAt(i) | 0;
    }
    return (parentid + hash >>> 0) % FS.nameTable.length;
  }, hashAddNode: (node) => {
    var hash = FS.hashName(node.parent.id, node.name);
    node.name_next = FS.nameTable[hash];
    FS.nameTable[hash] = node;
  }, hashRemoveNode: (node) => {
    var hash = FS.hashName(node.parent.id, node.name);
    if (FS.nameTable[hash] === node) {
      FS.nameTable[hash] = node.name_next;
    } else {
      var current = FS.nameTable[hash];
      while (current) {
        if (current.name_next === node) {
          current.name_next = node.name_next;
          break;
        }
        current = current.name_next;
      }
    }
  }, lookupNode: (parent, name) => {
    var errCode = FS.mayLookup(parent);
    if (errCode) {
      throw new FS.ErrnoError(errCode, parent);
    }
    var hash = FS.hashName(parent.id, name);
    for (var node = FS.nameTable[hash]; node; node = node.name_next) {
      var nodeName = node.name;
      if (node.parent.id === parent.id && nodeName === name) {
        return node;
      }
    }
    return FS.lookup(parent, name);
  }, createNode: (parent, name, mode, rdev) => {
    assert(typeof parent == "object");
    var node = new FS.FSNode(parent, name, mode, rdev);
    FS.hashAddNode(node);
    return node;
  }, destroyNode: (node) => {
    FS.hashRemoveNode(node);
  }, isRoot: (node) => {
    return node === node.parent;
  }, isMountpoint: (node) => {
    return !!node.mounted;
  }, isFile: (mode) => {
    return (mode & 61440) === 32768;
  }, isDir: (mode) => {
    return (mode & 61440) === 16384;
  }, isLink: (mode) => {
    return (mode & 61440) === 40960;
  }, isChrdev: (mode) => {
    return (mode & 61440) === 8192;
  }, isBlkdev: (mode) => {
    return (mode & 61440) === 24576;
  }, isFIFO: (mode) => {
    return (mode & 61440) === 4096;
  }, isSocket: (mode) => {
    return (mode & 49152) === 49152;
  }, flagModes: { "r": 0, "r+": 2, "w": 577, "w+": 578, "a": 1089, "a+": 1090 }, modeStringToFlags: (str) => {
    var flags = FS.flagModes[str];
    if (typeof flags == "undefined") {
      throw new Error("Unknown file open mode: " + str);
    }
    return flags;
  }, flagsToPermissionString: (flag) => {
    var perms = ["r", "w", "rw"][flag & 3];
    if (flag & 512) {
      perms += "w";
    }
    return perms;
  }, nodePermissions: (node, perms) => {
    if (FS.ignorePermissions) {
      return 0;
    }
    if (perms.includes("r") && !(node.mode & 292)) {
      return 2;
    } else if (perms.includes("w") && !(node.mode & 146)) {
      return 2;
    } else if (perms.includes("x") && !(node.mode & 73)) {
      return 2;
    }
    return 0;
  }, mayLookup: (dir) => {
    var errCode = FS.nodePermissions(dir, "x");
    if (errCode) return errCode;
    if (!dir.node_ops.lookup) return 2;
    return 0;
  }, mayCreate: (dir, name) => {
    try {
      var node = FS.lookupNode(dir, name);
      return 20;
    } catch (e) {
    }
    return FS.nodePermissions(dir, "wx");
  }, mayDelete: (dir, name, isdir) => {
    var node;
    try {
      node = FS.lookupNode(dir, name);
    } catch (e) {
      return e.errno;
    }
    var errCode = FS.nodePermissions(dir, "wx");
    if (errCode) {
      return errCode;
    }
    if (isdir) {
      if (!FS.isDir(node.mode)) {
        return 54;
      }
      if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
        return 10;
      }
    } else {
      if (FS.isDir(node.mode)) {
        return 31;
      }
    }
    return 0;
  }, mayOpen: (node, flags) => {
    if (!node) {
      return 44;
    }
    if (FS.isLink(node.mode)) {
      return 32;
    } else if (FS.isDir(node.mode)) {
      if (FS.flagsToPermissionString(flags) !== "r" || flags & 512) {
        return 31;
      }
    }
    return FS.nodePermissions(node, FS.flagsToPermissionString(flags));
  }, MAX_OPEN_FDS: 4096, nextfd: (fd_start = 0, fd_end = FS.MAX_OPEN_FDS) => {
    for (var fd = fd_start; fd <= fd_end; fd++) {
      if (!FS.streams[fd]) {
        return fd;
      }
    }
    throw new FS.ErrnoError(33);
  }, getStream: (fd) => FS.streams[fd], createStream: (stream, fd_start, fd_end) => {
    if (!FS.FSStream) {
      FS.FSStream = function() {
      };
      FS.FSStream.prototype = { object: { get: function() {
        return this.node;
      }, set: function(val) {
        this.node = val;
      } }, isRead: { get: function() {
        return (this.flags & 2097155) !== 1;
      } }, isWrite: { get: function() {
        return (this.flags & 2097155) !== 0;
      } }, isAppend: { get: function() {
        return this.flags & 1024;
      } } };
    }
    stream = Object.assign(new FS.FSStream(), stream);
    var fd = FS.nextfd(fd_start, fd_end);
    stream.fd = fd;
    FS.streams[fd] = stream;
    return stream;
  }, closeStream: (fd) => {
    FS.streams[fd] = null;
  }, chrdev_stream_ops: { open: (stream) => {
    var device = FS.getDevice(stream.node.rdev);
    stream.stream_ops = device.stream_ops;
    if (stream.stream_ops.open) {
      stream.stream_ops.open(stream);
    }
  }, llseek: () => {
    throw new FS.ErrnoError(70);
  } }, major: (dev) => dev >> 8, minor: (dev) => dev & 255, makedev: (ma, mi) => ma << 8 | mi, registerDevice: (dev, ops) => {
    FS.devices[dev] = { stream_ops: ops };
  }, getDevice: (dev) => FS.devices[dev], getMounts: (mount) => {
    var mounts = [];
    var check = [mount];
    while (check.length) {
      var m = check.pop();
      mounts.push(m);
      check.push.apply(check, m.mounts);
    }
    return mounts;
  }, syncfs: (populate, callback) => {
    if (typeof populate == "function") {
      callback = populate;
      populate = false;
    }
    FS.syncFSRequests++;
    if (FS.syncFSRequests > 1) {
      err("warning: " + FS.syncFSRequests + " FS.syncfs operations in flight at once, probably just doing extra work");
    }
    var mounts = FS.getMounts(FS.root.mount);
    var completed = 0;
    function doCallback(errCode) {
      assert(FS.syncFSRequests > 0);
      FS.syncFSRequests--;
      return callback(errCode);
    }
    function done(errCode) {
      if (errCode) {
        if (!done.errored) {
          done.errored = true;
          return doCallback(errCode);
        }
        return;
      }
      if (++completed >= mounts.length) {
        doCallback(null);
      }
    }
    mounts.forEach((mount) => {
      if (!mount.type.syncfs) {
        return done(null);
      }
      mount.type.syncfs(mount, populate, done);
    });
  }, mount: (type, opts, mountpoint) => {
    if (typeof type == "string") {
      throw type;
    }
    var root = mountpoint === "/";
    var pseudo = !mountpoint;
    var node;
    if (root && FS.root) {
      throw new FS.ErrnoError(10);
    } else if (!root && !pseudo) {
      var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
      mountpoint = lookup.path;
      node = lookup.node;
      if (FS.isMountpoint(node)) {
        throw new FS.ErrnoError(10);
      }
      if (!FS.isDir(node.mode)) {
        throw new FS.ErrnoError(54);
      }
    }
    var mount = { type, opts, mountpoint, mounts: [] };
    var mountRoot = type.mount(mount);
    mountRoot.mount = mount;
    mount.root = mountRoot;
    if (root) {
      FS.root = mountRoot;
    } else if (node) {
      node.mounted = mount;
      if (node.mount) {
        node.mount.mounts.push(mount);
      }
    }
    return mountRoot;
  }, unmount: (mountpoint) => {
    var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
    if (!FS.isMountpoint(lookup.node)) {
      throw new FS.ErrnoError(28);
    }
    var node = lookup.node;
    var mount = node.mounted;
    var mounts = FS.getMounts(mount);
    Object.keys(FS.nameTable).forEach((hash) => {
      var current = FS.nameTable[hash];
      while (current) {
        var next = current.name_next;
        if (mounts.includes(current.mount)) {
          FS.destroyNode(current);
        }
        current = next;
      }
    });
    node.mounted = null;
    var idx = node.mount.mounts.indexOf(mount);
    assert(idx !== -1);
    node.mount.mounts.splice(idx, 1);
  }, lookup: (parent, name) => {
    return parent.node_ops.lookup(parent, name);
  }, mknod: (path, mode, dev) => {
    var lookup = FS.lookupPath(path, { parent: true });
    var parent = lookup.node;
    var name = PATH.basename(path);
    if (!name || name === "." || name === "..") {
      throw new FS.ErrnoError(28);
    }
    var errCode = FS.mayCreate(parent, name);
    if (errCode) {
      throw new FS.ErrnoError(errCode);
    }
    if (!parent.node_ops.mknod) {
      throw new FS.ErrnoError(63);
    }
    return parent.node_ops.mknod(parent, name, mode, dev);
  }, create: (path, mode) => {
    mode = mode !== void 0 ? mode : 438;
    mode &= 4095;
    mode |= 32768;
    return FS.mknod(path, mode, 0);
  }, mkdir: (path, mode) => {
    mode = mode !== void 0 ? mode : 511;
    mode &= 511 | 512;
    mode |= 16384;
    return FS.mknod(path, mode, 0);
  }, mkdirTree: (path, mode) => {
    var dirs = path.split("/");
    var d = "";
    for (var i = 0; i < dirs.length; ++i) {
      if (!dirs[i]) continue;
      d += "/" + dirs[i];
      try {
        FS.mkdir(d, mode);
      } catch (e) {
        if (e.errno != 20) throw e;
      }
    }
  }, mkdev: (path, mode, dev) => {
    if (typeof dev == "undefined") {
      dev = mode;
      mode = 438;
    }
    mode |= 8192;
    return FS.mknod(path, mode, dev);
  }, symlink: (oldpath, newpath) => {
    if (!PATH_FS.resolve(oldpath)) {
      throw new FS.ErrnoError(44);
    }
    var lookup = FS.lookupPath(newpath, { parent: true });
    var parent = lookup.node;
    if (!parent) {
      throw new FS.ErrnoError(44);
    }
    var newname = PATH.basename(newpath);
    var errCode = FS.mayCreate(parent, newname);
    if (errCode) {
      throw new FS.ErrnoError(errCode);
    }
    if (!parent.node_ops.symlink) {
      throw new FS.ErrnoError(63);
    }
    return parent.node_ops.symlink(parent, newname, oldpath);
  }, rename: (old_path, new_path) => {
    var old_dirname = PATH.dirname(old_path);
    var new_dirname = PATH.dirname(new_path);
    var old_name = PATH.basename(old_path);
    var new_name = PATH.basename(new_path);
    var lookup, old_dir, new_dir;
    lookup = FS.lookupPath(old_path, { parent: true });
    old_dir = lookup.node;
    lookup = FS.lookupPath(new_path, { parent: true });
    new_dir = lookup.node;
    if (!old_dir || !new_dir) throw new FS.ErrnoError(44);
    if (old_dir.mount !== new_dir.mount) {
      throw new FS.ErrnoError(75);
    }
    var old_node = FS.lookupNode(old_dir, old_name);
    var relative = PATH_FS.relative(old_path, new_dirname);
    if (relative.charAt(0) !== ".") {
      throw new FS.ErrnoError(28);
    }
    relative = PATH_FS.relative(new_path, old_dirname);
    if (relative.charAt(0) !== ".") {
      throw new FS.ErrnoError(55);
    }
    var new_node;
    try {
      new_node = FS.lookupNode(new_dir, new_name);
    } catch (e) {
    }
    if (old_node === new_node) {
      return;
    }
    var isdir = FS.isDir(old_node.mode);
    var errCode = FS.mayDelete(old_dir, old_name, isdir);
    if (errCode) {
      throw new FS.ErrnoError(errCode);
    }
    errCode = new_node ? FS.mayDelete(new_dir, new_name, isdir) : FS.mayCreate(new_dir, new_name);
    if (errCode) {
      throw new FS.ErrnoError(errCode);
    }
    if (!old_dir.node_ops.rename) {
      throw new FS.ErrnoError(63);
    }
    if (FS.isMountpoint(old_node) || new_node && FS.isMountpoint(new_node)) {
      throw new FS.ErrnoError(10);
    }
    if (new_dir !== old_dir) {
      errCode = FS.nodePermissions(old_dir, "w");
      if (errCode) {
        throw new FS.ErrnoError(errCode);
      }
    }
    FS.hashRemoveNode(old_node);
    try {
      old_dir.node_ops.rename(old_node, new_dir, new_name);
    } catch (e) {
      throw e;
    } finally {
      FS.hashAddNode(old_node);
    }
  }, rmdir: (path) => {
    var lookup = FS.lookupPath(path, { parent: true });
    var parent = lookup.node;
    var name = PATH.basename(path);
    var node = FS.lookupNode(parent, name);
    var errCode = FS.mayDelete(parent, name, true);
    if (errCode) {
      throw new FS.ErrnoError(errCode);
    }
    if (!parent.node_ops.rmdir) {
      throw new FS.ErrnoError(63);
    }
    if (FS.isMountpoint(node)) {
      throw new FS.ErrnoError(10);
    }
    parent.node_ops.rmdir(parent, name);
    FS.destroyNode(node);
  }, readdir: (path) => {
    var lookup = FS.lookupPath(path, { follow: true });
    var node = lookup.node;
    if (!node.node_ops.readdir) {
      throw new FS.ErrnoError(54);
    }
    return node.node_ops.readdir(node);
  }, unlink: (path) => {
    var lookup = FS.lookupPath(path, { parent: true });
    var parent = lookup.node;
    if (!parent) {
      throw new FS.ErrnoError(44);
    }
    var name = PATH.basename(path);
    var node = FS.lookupNode(parent, name);
    var errCode = FS.mayDelete(parent, name, false);
    if (errCode) {
      throw new FS.ErrnoError(errCode);
    }
    if (!parent.node_ops.unlink) {
      throw new FS.ErrnoError(63);
    }
    if (FS.isMountpoint(node)) {
      throw new FS.ErrnoError(10);
    }
    parent.node_ops.unlink(parent, name);
    FS.destroyNode(node);
  }, readlink: (path) => {
    var lookup = FS.lookupPath(path);
    var link = lookup.node;
    if (!link) {
      throw new FS.ErrnoError(44);
    }
    if (!link.node_ops.readlink) {
      throw new FS.ErrnoError(28);
    }
    return PATH_FS.resolve(FS.getPath(link.parent), link.node_ops.readlink(link));
  }, stat: (path, dontFollow) => {
    var lookup = FS.lookupPath(path, { follow: !dontFollow });
    var node = lookup.node;
    if (!node) {
      throw new FS.ErrnoError(44);
    }
    if (!node.node_ops.getattr) {
      throw new FS.ErrnoError(63);
    }
    return node.node_ops.getattr(node);
  }, lstat: (path) => {
    return FS.stat(path, true);
  }, chmod: (path, mode, dontFollow) => {
    var node;
    if (typeof path == "string") {
      var lookup = FS.lookupPath(path, { follow: !dontFollow });
      node = lookup.node;
    } else {
      node = path;
    }
    if (!node.node_ops.setattr) {
      throw new FS.ErrnoError(63);
    }
    node.node_ops.setattr(node, { mode: mode & 4095 | node.mode & ~4095, timestamp: Date.now() });
  }, lchmod: (path, mode) => {
    FS.chmod(path, mode, true);
  }, fchmod: (fd, mode) => {
    var stream = FS.getStream(fd);
    if (!stream) {
      throw new FS.ErrnoError(8);
    }
    FS.chmod(stream.node, mode);
  }, chown: (path, uid, gid, dontFollow) => {
    var node;
    if (typeof path == "string") {
      var lookup = FS.lookupPath(path, { follow: !dontFollow });
      node = lookup.node;
    } else {
      node = path;
    }
    if (!node.node_ops.setattr) {
      throw new FS.ErrnoError(63);
    }
    node.node_ops.setattr(node, { timestamp: Date.now() });
  }, lchown: (path, uid, gid) => {
    FS.chown(path, uid, gid, true);
  }, fchown: (fd, uid, gid) => {
    var stream = FS.getStream(fd);
    if (!stream) {
      throw new FS.ErrnoError(8);
    }
    FS.chown(stream.node, uid, gid);
  }, truncate: (path, len) => {
    if (len < 0) {
      throw new FS.ErrnoError(28);
    }
    var node;
    if (typeof path == "string") {
      var lookup = FS.lookupPath(path, { follow: true });
      node = lookup.node;
    } else {
      node = path;
    }
    if (!node.node_ops.setattr) {
      throw new FS.ErrnoError(63);
    }
    if (FS.isDir(node.mode)) {
      throw new FS.ErrnoError(31);
    }
    if (!FS.isFile(node.mode)) {
      throw new FS.ErrnoError(28);
    }
    var errCode = FS.nodePermissions(node, "w");
    if (errCode) {
      throw new FS.ErrnoError(errCode);
    }
    node.node_ops.setattr(node, { size: len, timestamp: Date.now() });
  }, ftruncate: (fd, len) => {
    var stream = FS.getStream(fd);
    if (!stream) {
      throw new FS.ErrnoError(8);
    }
    if ((stream.flags & 2097155) === 0) {
      throw new FS.ErrnoError(28);
    }
    FS.truncate(stream.node, len);
  }, utime: (path, atime, mtime) => {
    var lookup = FS.lookupPath(path, { follow: true });
    var node = lookup.node;
    if (path === "") {
    }