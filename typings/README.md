[Logler](README.md)

# Logler

## Index

### Classes

* [Logler](classes/logler.md)

### Interfaces

* [IMandatoryTokens](interfaces/imandatorytokens.md)
* [IOnLogInfo](interfaces/ionloginfo.md)
* [IOptions](interfaces/ioptions.md)
* [ITokens](interfaces/itokens.md)

### Type aliases

* [IFormatter](README.md#iformatter)
* [IGetColor](README.md#igetcolor)
* [IGetLogLevelValue](README.md#igetloglevelvalue)
* [IGetMandatoryTokens](README.md#igetmandatorytokens)
* [IGetTokens](README.md#igettokens)
* [ILevel](README.md#ilevel)
* [ILogger](README.md#ilogger)
* [ILogler](README.md#ilogler)
* [ISerializer](README.md#iserializer)
* [IWriter](README.md#iwriter)

### Variables

* [colorLogs](README.md#const-colorlogs)
* [getColor](README.md#const-getcolor)
* [getLogLevelValue](README.md#const-getloglevelvalue)
* [getMandatoryTokens](README.md#const-getmandatorytokens)

### Functions

* [formatter](README.md#const-formatter)
* [getTokens](README.md#const-gettokens)
* [serializer](README.md#const-serializer)
* [writer](README.md#const-writer)

## Type aliases

###  IFormatter

Ƭ **IFormatter**: *function*

Defined in interface.ts:34

#### Type declaration:

▸ (`mandatoryTokens`: [IMandatoryTokens](interfaces/imandatorytokens.md), `level`: [ILevel](README.md#ilevel), `msg`: string): *string*

**Parameters:**

Name | Type |
------ | ------ |
`mandatoryTokens` | [IMandatoryTokens](interfaces/imandatorytokens.md) |
`level` | [ILevel](README.md#ilevel) |
`msg` | string |

___

###  IGetColor

Ƭ **IGetColor**: *function*

Defined in interface.ts:11

#### Type declaration:

▸ (`level`: [ILevel](README.md#ilevel)): *string*

**Parameters:**

Name | Type |
------ | ------ |
`level` | [ILevel](README.md#ilevel) |

___

###  IGetLogLevelValue

Ƭ **IGetLogLevelValue**: *function*

Defined in interface.ts:32

#### Type declaration:

▸ (`level`: [ILevel](README.md#ilevel)): *number*

**Parameters:**

Name | Type |
------ | ------ |
`level` | [ILevel](README.md#ilevel) |

___

###  IGetMandatoryTokens

Ƭ **IGetMandatoryTokens**: *function*

Defined in interface.ts:30

#### Type declaration:

▸ (): *[IMandatoryTokens](interfaces/imandatorytokens.md)*

___

###  IGetTokens

Ƭ **IGetTokens**: *function*

Defined in interface.ts:7

#### Type declaration:

▸ (`tokens`: [ITokens](interfaces/itokens.md), `level`: [ILevel](README.md#ilevel), ...`args`: any[]): *object*

**Parameters:**

Name | Type |
------ | ------ |
`tokens` | [ITokens](interfaces/itokens.md) |
`level` | [ILevel](README.md#ilevel) |
`...args` | any[] |

* \[ **token**: *string*\]: string

___

###  ILevel

Ƭ **ILevel**: *"trace" | "debug" | "info" | "log" | "warn" | "error" | "fatal"*

Defined in interface.ts:1

___

###  ILogger

Ƭ **ILogger**: *function*

Defined in interface.ts:40

#### Type declaration:

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

___

###  ILogler

Ƭ **ILogler**: *object*

Defined in interface.ts:42

#### Type declaration:

___

###  ISerializer

Ƭ **ISerializer**: *function*

Defined in interface.ts:36

#### Type declaration:

▸ (...`args`: any[]): *string*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

___

###  IWriter

Ƭ **IWriter**: *function*

Defined in interface.ts:38

#### Type declaration:

▸ (`level`: [ILevel](README.md#ilevel), `msg`: string): *void*

**Parameters:**

Name | Type |
------ | ------ |
`level` | [ILevel](README.md#ilevel) |
`msg` | string |

## Variables

### `Const` colorLogs

• **colorLogs**: *boolean* = process.env.NODE_ENV === "production" ? false : true

Defined in defaults.ts:20

___

### `Const` getColor

• **getColor**: *[IGetColor](README.md#igetcolor)* = (() => {
  const colors: {
    [level in ILevel]: string;
  } = {
    trace: "cyan",
    debug: "cyan",
    info: "green",
    log: "green",
    warn: "yellow",
    error: "red",
    fatal: "red",
  };

  return (level: ILevel) => colors[level];
})()

Defined in utils.ts:4

___

### `Const` getLogLevelValue

• **getLogLevelValue**: *[IGetLogLevelValue](README.md#igetloglevelvalue)* = (() => {
  const levelValues: {
    [level in ILevel]: number
  } = {
    trace: 0,
    debug: 1,
    info: 2,
    log: 3,
    warn: 4,
    error: 5,
    fatal: 6,
  };

  return (level: ILevel) => levelValues[level];
})()

Defined in utils.ts:62

Returns the priority for each log level.
This is especially useful when deciding to print the logs
based on the levels.
This can also be used to Print only critical logs in production

___

### `Const` getMandatoryTokens

• **getMandatoryTokens**: *[IGetMandatoryTokens](README.md#igetmandatorytokens)* = (() => {
  // Stack trace format :
  // https://v8.dev/docs/stack-trace-api
  const regex = /\((.*):(\d+):(\d+)\)$/;

  return () => {
    // Capture file & line_no
    const match = regex.exec((new Error() as any).stack.split("\n")[4]) as RegExpExecArray;

    return {
      filePath: match[1],
      fileName: path.parse(match[1]).base,
      lineNum: +match[2],
      colNum: +match[3],
      timestamp: new Date().toISOString(),
    };
  };
})()

Defined in utils.ts:37

Returns the mandatory tokens

Returns the tokens that has to be
present in the `tokens` object passed
to `format` option

## Functions

### `Const` formatter

▸ **formatter**(`__namedParameters`: object, `level`: [ILevel](README.md#ilevel), `msg`: string): *string*

Defined in defaults.ts:7

Default log format

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`colNum` | number |
`fileName` | string |
`lineNum` | number |
`timestamp` | string |

▪ **level**: *[ILevel](README.md#ilevel)*

▪ **msg**: *string*

**Returns:** *string*

___

### `Const` getTokens

▸ **getTokens**(`tokens`: [ITokens](interfaces/itokens.md), `level`: "trace" | "debug" | "info" | "log" | "warn" | "error" | "fatal", ...`args`: any[]): *object*

Defined in utils.ts:23

Get tokens from getters

**Parameters:**

Name | Type |
------ | ------ |
`tokens` | [ITokens](interfaces/itokens.md) |
`level` | "trace" &#124; "debug" &#124; "info" &#124; "log" &#124; "warn" &#124; "error" &#124; "fatal" |
`...args` | any[] |

**Returns:** *object*

* \[ **K**: *string*\]: string

___

### `Const` serializer

▸ **serializer**(...`args`: any[]): *string*

Defined in defaults.ts:12

Serializes the given inputs arguments

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *string*

___

### `Const` writer

▸ **writer**(`level`: "trace" | "debug" | "info" | "log" | "warn" | "error" | "fatal", `msg`: string): *void*

Defined in defaults.ts:14

**Parameters:**

Name | Type |
------ | ------ |
`level` | "trace" &#124; "debug" &#124; "info" &#124; "log" &#124; "warn" &#124; "error" &#124; "fatal" |
`msg` | string |

**Returns:** *void*
