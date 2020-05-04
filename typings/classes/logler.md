[Logler](../README.md) › [Logler](logler.md)

# Class: Logler

Creates a new instance of logger with the specified options

This logger gives a flexibility of creating your own format
by specifying the format which shall be formed using js template,
and input to the format will be an object whose properties can be formed
via getter functions. Also note that you will have the flexibility of creating
your own serializer for the list of arguments sent to logger.
This way you may choose whether to serialize JSON object, whether to display
numbers or not etc

## Hierarchy

* **Logler**

## Implements

* object

## Index

### Constructors

* [constructor](logler.md#constructor)

### Methods

* [debug](logler.md#debug)
* [error](logler.md#error)
* [fatal](logler.md#fatal)
* [info](logler.md#info)
* [log](logler.md#log)
* [trace](logler.md#trace)
* [warn](logler.md#warn)

## Constructors

###  constructor

\+ **new Logler**(`options?`: Partial‹[IOptions](../interfaces/ioptions.md)›): *[Logler](logler.md)*

Defined in logler.ts:19

**Parameters:**

Name | Type |
------ | ------ |
`options?` | Partial‹[IOptions](../interfaces/ioptions.md)› |

**Returns:** *[Logler](logler.md)*

## Methods

###  debug

▸ **debug**(...`args`: any[]): *void*

Defined in logler.ts:48

This method can be used to log debug information.
It will mostly be useful for a developer

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *void*

___

###  error

▸ **error**(...`args`: any[]): *void*

Defined in logler.ts:84

This method can be used to log unhandled exceptions.
Logs written by this method must be used for listing
down all the errors in the system.

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *void*

___

###  fatal

▸ **fatal**(...`args`: any[]): *void*

Defined in logler.ts:95

These logs are very similar to error logs, but
the only difference lies in the priority that these
logs would create. Which means when a fatal logs is printed,
it needs to be notified to the concerned person for
immediate action.

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *void*

___

###  info

▸ **info**(...`args`: any[]): *void*

Defined in logler.ts:58

This method can be used to log useful information
regarding system interaction and behaviour.
This log written by this method must be understandable
even by a non-developer person

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *void*

___

###  log

▸ **log**(...`args`: any[]): *void*

Defined in logler.ts:65

Generic logging method

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *void*

___

###  trace

▸ **trace**(...`args`: any[]): *void*

Defined in logler.ts:40

This method can be used to log tracing data.
This can include information that traces a request lifecycle
or the like

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *void*

___

###  warn

▸ **warn**(...`args`: any[]): *void*

Defined in logler.ts:75

This method can be used to log warning messages.
Logs written by this method would typically include
handled exceptions. This is way of informing the log admin
regarding a failure, which needs to be fixed.

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *void*
