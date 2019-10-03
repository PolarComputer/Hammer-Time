# Hammer Time Library
A super simple time based project. This time library allows you to add, subtract; hours and minuntes to Hammer Object. Which are structured like "hh:mm", like "18:26". This library doesn't require Moment, however it was build to work well with it. We designed Hammer, because we were using HTML time inputs, and there wasn't an easy way to manipulate them. So we build this simple library.<br>

<br>
Designed by Polar Computers Inc. for the Pace Productivity Suite<br>
Written by Evan Sellers <sellersew@gmail.com>, September 2019
<br>
<br>

## Installation
Installation is super simple if you are using ES6 Javascript Modules. Just use the simple import command. However if you aren't using this method, you should still be able to use no-Module based Javascript, but it wasn't designed for this.
``` Javascript
import { Hammer } from 'hammer-time.js';
```



<hr>

## Time String Format
Very commonly within the Hammer Library you can use what we refer to a Time Strings, instead of a full Hammer Object. For example, your can use the Hammer Library to sort a list of strings that are in a valid Time String format, or you can check if a Hammer Object Time is between two Time Strings. A time string is written in the 24-hour, military time, format. In notation this is commonly written as `hh:mm`. Where the `hh` is hours (00-24), since the start of the day. Hammer treats both hour `00` and `24`, therefore `"00:18"` => `"12:18am"`. The `mm` is the minutes (00-59), and `60` would be treated as a new hour. Hammer doesn't recognize seconds, if you need something with that accuracy Hammer is not the library for you. In our time format if the number is less than 10, you must add a leading zero. You can use the static method `Hammer.isHammer( String )`, to verify if your Time String is valid within Hammer. This will return a boolean. HTML time inputs, should all automatically be valid.

### Valid Examples
| Time String   | Military Time | standard Time  |
| ------------- |---------------| ---------------|
| "00:00"       | "24:00"       | "12:00am"      |
| "00:18"       | "24:18"       | "12:18am"      |
| "24:00"       | "24:00"       | "12:00am"      |
| "24:59"       | "24:59"       | "12:59am"      |
| "01:00"       | "1:00"        | "1:00am"       |
| "11:00"       | "11:00"       | "11:00am"      |
| "15:00"       | "15:00"       | "3:00pm"       |

### Invalid Examples
  - `"pie"` => Not a time based string
  - `"26:00"` => More hours than are in a day
  - `"-1:00"` => Negative Number
  - `12:00` => Not a String
  - `"8:99"` => More minutes than in an hour

### Using Hammer.isHammer()
By using the static method `Hammer.isHammer()`, you can check to see if a time string is valid, or if a Object is an instance of Hammer. If the parameter passed is a valid time string or if it's a Hammer Object the system will return `true`, if not it will return `false`.

``` Javascript
// Javascript - Hammer has been imported
var foo = new Hammer( "1:00" );

    Hammer.isHammer( "1:00" );  // true
    Hammer.isHammer( "26:00" ); // true
    Hammer.isHammer( "dude" );  // false
    Hammer.isHammer( foo );     // true

```

<hr>

## Methods
Here are some of the basic function that you can use inside Hammer. If you have an idea for more stuff to add, feel free to fork us, and push your changes back in.



### Create New Object
Creating a new object with Hammer is super easy. You can either clone a already existing Hammer object or creating a new Hammer Object with a valid Time String.

``` Javascript
// Javascript - Hammer has been imported
var foo = new Hammer( "1:00" );  // time set to 1:00
var goo = new Hammer();          // time set to 24:00
var hoo = new Hammer( foo );     // time set to 1:00

```

<br>
<br>

### Set Time
This method allows you to set the time using a time string. For example you can set it using a string. Like `"24:00"`, `"12:00"`, `"24:59"`, `"9:00"`. These strings are checked using the static method `Hammer.isHammer( _time )`. You can also pass a Hammer Time Object to set the time.

<b>Parameters</b>
  - `_time` <i>(STRING)</i> => A time string that is checked with `Hammer.isHammer()` to verify it is the correct format
  - `_time` <i>(HAMMER)</i> => Set the time using a Hammer Time Object

<b>Return</b>
  - The time that is resulting time set, in military time, using `this.get()`;

<b>Example</b>
``` Javascript
// Javascript - Hammer has been imported
var foo = new Hammer( "1:00" );  // time set to 1:00
var goo = new Hammer( "18:46" ); // time set to 24:00
    foo.set( "13:00" );          // time set to 13:00
    foo.set( goo );              // time set to 18:46

```

<br>
<br>

### Set Hour
This method allows you to set the hour of a Hammer object with either a string or integer (0-24). Some examples are as followed, `"24"`, `"09"`, `"9"`, `9`. If you go over 24 hours, the hour will <b>NOT</b> be set. After the hour is set, it will return the hour as a string. If you notice the hour doesn't change this is because you aren't using a valid hour parameter.

<b>Parameters</b>
- `_hour` <i>(STRING)</i> => Set the hour using a string, which is converted
- `_hour` <i>(INTEGER)</i> => Set the hour using a integer, which is converted

<b>Return</b>
- The time that is resulting hour time set, in military time, using `this.getHour()`;

<b>Example</b>
``` Javascript
// Javascript - Hammer has been imported
var foo = new Hammer( "1:59" ); // time set to 1:59
    foo.setHour( "13" );        // time set to 13:59
    foo.setHour( 10 );          // time set to 10:59

```

<br>
<br>

### Set Minute
This method allows you to set the minute of a Hammer object with either a string or an integer (0-59). Some examples are as followed, `"01"`, `"1"`, `"59"`, `59`, `11`. If your go over 59 minutes, the minutes will <b>NOT</b> be set. After the minute is set, it will return the minute as a string. If you notice the hour doesn't change this is because you aren't using a valid hour parameter.

<b>Parameters</b>
- `_minute` <i>(STRING)</i> => Set the minute using a string, which is converted
- `_minute` <i>(INTEGER)</i> => Set the minute using a integer, which is converted

<b>Return</b>
- The time that is resulting minute time set, using `this.getMinute()`;

<b>Example</b>
``` Javascript
// Javascript - Hammer has been imported
var foo = new Hammer( "1:59" ); // time set to 1:59
    foo.setMinute( "13" );      // time set to 1:13
    foo.setMinute( 10 );        // time set to 1:10

```

<br>
<br>

### Get Military Time
This method will return a <i>String</i>, that is the military time format, in the notation, `(hh:mm)`. This will be in the Time String format, which you can read about above. The string is verified with the `Hammer.isHammer()` method.

<b>Return</b>
- <i>(STRING)</i> => current set time, in military format

<b>Example</b>
``` Javascript
// Javascript - Hammer has been imported
var foo = new Hammer( "1:59" ); // time set to 1:59
    foo.get();                  // returns (STRING) "1:59"

```

<br>
<br>

### Get Hour
This method will return the current set hour in military format (0-24). By default this will return a string. However, if you pass the <i>boolean</i>, `true`, it will return an integer.

<b>Parameters</b>
- `_ReturnAsInt` <i>(BOOLEAN)</i> => if you pass `true`, then it will return the hour as an <i>Integers</i>

<b>Return</b>
- <i>(STRING)</i> => current set hour time, in military format
- <i>(INTEGER)</i> => current set hour time, in military format, if you pass the parameter `true`

<b>Example</b>
``` Javascript
// Javascript - Hammer has been imported
var foo = new Hammer( "12:59" ); // time set to 1:59
    foo.getHour();               // returns (STRING) "12"
    foo.getHour( false );        // returns (STRING) "12"
    foo.getHour( true );         // returns (INT) 12
```

<br>
<br>

### Get Minute
This method will return the current set minute (0-59). By default this will return a string. However, if you pass the <i>boolean</i>, `true`, it will return an integer.

<b>Parameters</b>
- `_ReturnAsInt` <i>(BOOLEAN)</i> => if you pass `true`, then it will return the minute as an <i>Integers</i>

<b>Return</b>
- <i>(STRING)</i> => current set minute time
- <i>(INTEGER)</i> => current set minute time, if you pass the parameter `true`

<b>Example</b>
``` Javascript
// Javascript - Hammer has been imported
var foo = new Hammer( "12:59" ); // time set to 1:59
    foo.getMinute();             // returns (STRING) "59"
    foo.getMinute( false );      // returns (STRING) "59"
    foo.getMinute( true );       // returns (INT) 59
```

<br>
<br>

### Get Regular Time
This will convert one, or even two, to standard time. If you use the method `this.toString()`, the time will be exported and returned in standard regular time `HH:mm am/pm`. The hour time will be between 1-12, and a `AM` or `PM` will follow it. In addition to returning one time, it can also return a range of times, you can do this by passing an additional Time String or Hammer Object. Don't worry about the times being in order, the method will put them in chronological order when returned.

<b>Examples</b>
  - `( "10:00", "11:00" )` => `"10-11AM"`
  - `( "13:52", "15:00" )` => `"2:52-3:00PM"`
  - `( "10:00", "16:00" )` => `"10AM-4PM"`
  - `( "11:00" )` => `"11:00AM"`
  - `( "20:00" )` => `"8:00PM"`

<b>Parameters</b>
  - `_End` <i>(STRING/HAMMER)</i> => the end time range <i>(NOT REQUIRED)</i>

<b>Return</b>
- Regular Time <i>(STRING)</i> => String in regular time with AM/PM attached. Will be structured like examples above as string.

<b>Example</b>
``` Javascript
// Javascript - Hammer has been imported
var eoo = new Hammer( "6:00" );    // time set to 6:00
var foo = new Hammer( "8:59" );    // time set to 8:59
var goo = new Hammer( "23:00" );   // time set to 23:00
var hoo = new Hammer( "18:12" );   // time set to 18:12

foo.toString();   // (STRING) "8:59AM"
eoo.toString();   // (STRING) "6AM"

goo.toString( eoo );    // (STRING) "6AM-11PM"
eoo.toString( "7:12" ); // (STRING) "6-7:12AM"
hoo.toString( goo );    // (STRING) "6:12-11:00PM"
```

<br>
<br>

### Get Current Time <i>(Static)</i>
This Static method allows you to get the current time, from your computer, and returns it in a valid Time String format, and in military time. Just use the static method `Hammer.now()`.

<b>Return</b>
- Current Time <i>(STRING)</i> => returns current time, as Time String, in military format.

<b>Example</b>
``` Javascript
// Javascript - Hammer has been imported
Hammer.now(); // Return current time
```

<br>
<br>

### Add Time
This will allow you to add a specific amount of time to a Hammer Object. You can pass the amount as either a <i>String</i> or <i>Integer</i>. Then you pass, what we call the <i>base</i>, which is a string that says either `hour`, or `minute`. It's pretty self explanatory, if you pass the <i>String</i> `hour`, it will add the amount of hours you pass, if you pass the <i>String</i> `minute`, it will add that amount of minutes. If you pass minute amount  that will cause the minute to overflow above 59, we will add the appropriate amount of hours. If you pass a hour amount that flows over 24 hours, we will reset the day, to `00:mm`, then add the rest.

<b>Parameters</b>
  - `_amount` <i>(STRING/INTEGER)</i> => Ammount of time to be added
  - `_base` <i>(STRING)</i> => pass either `"hour"`, `"h"`, or `"hours"` to add by hours or pass `"min"`, `"m"`, `"minute"`, "`minutes`" to add by minutes

<b>Return</b>
  - Set Time <i>(STRING)</i> => time set after operation, retuned in military time using `this.get()`.

<b>Example</b>
``` Javascript
// Javascript - Hammer has been imported
var foo = new Hammer( "12:59" ); // time set to 12:59
    foo.add( 1, "minute" );      // time set to 13:00
    foo.add( 1, "hour" );        // time set to 14:00
    foo.add( "61", "minute" );   // time set to 15:01
    foo.add( 59, "minutes" );    // time set to 16:00
    foo.add( 9, "hours" );       // time set to 1:00
```

<br>
<br>

### Subtract Time
This will allow you to subtract a specific amount of time to a Hammer Object. You can pass the amount as either a <i>String</i> or <i>Integer</i>. Then you pass, what we call the <i>base</i>, which is a string that says either `hour`, or `minute`. It's pretty self explanatory, if you pass the <i>String</i> `hour`, it will subtract the amount of hours you pass, if you pass the <i>String</i> `minute`, it will subtract that amount of minutes. If you pass minute amount that will cause the minute to overflow above 59, we will subtract the appropriate amount of hours. If you pass a hour amount that flows over 24 hours, we will reset the day, to `00:mm`, then subtract the rest.

<b>Parameters</b>
  - `_amount` <i>(STRING/INTEGER)</i> => Ammount of time to be subtracted
  - `_base` <i>(STRING)</i> => pass either `"hour"`, `"h"`, or `"hours"` to subtract by hours or pass `"min"`, `"m"`, `"minute"`, "`minutes`" to subtract by minutes

<b>Return</b>
  - Set Time <i>(STRING)</i> => time set after operation, retuned in military time using `this.get()`.

<b>Example</b>
``` Javascript
// Javascript - Hammer has been imported
var foo = new Hammer( "12:59" );    // time set to 12:59
    foo.subtract( 59, "minute" );   // time set to 12:00
    foo.subtract( 1, "hour" );      // time set to 11:00
    foo.subtract( "61", "minute" ); // time set to 9:59
    foo.subtract( 59, "minutes" );  // time set to 9:00
    foo.subtract( 10, "hours" );    // time set to 23:00
```


<hr>

## Comparisons Methods
These comparisons methods, will allow you to do, a lot. You can compare a Hammer Object and another Hammer Object or a Time String. We will show you how you can sort a list of Time String or Hammer Objects.


### Equal Comparisons
This will check to see if `this` and a Time String or Hammer Object are equal, or the same time. You can either pass it a Time String or a Hammer Object.

<b>Parameters</b>
  - `_Hammer` <i>(STRING/HAMMER)</i> => The time string to Hammer object that is compared against

<b>Return</b>
  - `true` <i>(BOOLEAN)</i> => if the Hammer Object or Time String is equal
  - `false` <i>(BOOLEAN)</i> => if the Hammer Object or TIme String is <b>NOT</b> equal

<b>Example</b>
``` Javascript
// Javascript - Hammer has been imported
var foo = new Hammer( "12:59" );  // time set to 12:59

foo.equals( "12:59" );   // (BOOLEAN) true
foo.equals( "23:26" );   // (BOOLEAN) false

foo.equals( new Hammer( "12:59" ) ); // (BOOLEAN) true
foo.equals( new Hammer( "23:26" ) ); // (BOOLEAN) false
```

<br>
<br>

### Is Between dates
This will check to see if a time is between, two other times. Plus you don't have to worry about getting them in the right order. This function will make sure they are in the right order. By default it will not check to see if the time is equal to it, if you pass the `true` <i>boolean</i> in the `_orEqual` parameter it will check if it is equal too. You can either pass a time string or a Hammer Object.

<b>Parameters</b>
  - `_Start` <i>(STRING/HAMMER)</i> => Is the starting time that is checked to see if `this` is between
  - `_End` <i>(STRING/HAMMER)</i> => Is the ending time that is checked to see if `this` is between
  - `_orEqual` <i>(BOOLEAN)</i> => If set to true will also return true if `this` is equal to or between the start or end

<b>Return</b>
  - `true` <i>(BOOLEAN)</i> => if the `this` time is between the start and end
  - `false` <i>(BOOLEAN)</i> => if the `this` isn't between the start and end

<b>Example</b>
``` Javascript
// Javascript - Hammer has been imported
var foo = new Hammer( "9:30" );  // time set to 9:30

foo.isBetween( "12:59", "8:26" );  // (BOOLEAN) true
foo.isBetween( "8:26", "12:59" );  // (BOOLEAN) true

foo.isBetween( "12:59", "10:26" );  // (BOOLEAN) false
foo.isBetween( "10:26", "12:59" );  // (BOOLEAN) false

foo.isBetween( "12:59", "9:30" );         // (BOOLEAN) false
foo.isBetween( "12:59", "9:30", true );   // (BOOLEAN) true
foo.isBetween( "9:31", "12:59", true );   // (BOOLEAN) false

foo.isBetween( new Hammer( "12:59" ), new Hammer( "8:26" ) );  // (BOOLEAN) true
foo.isBetween( new Hammer( "8:26" ), new Hammer( "12:59" ) );  // (BOOLEAN) true

foo.isBetween( new Hammer( "12:59" ), new Hammer( "10:26" ) );  // (BOOLEAN) false
foo.isBetween( new Hammer( "10:26" ), new Hammer( "12:59" ) );  // (BOOLEAN) false

foo.isBetween( new Hammer( "12:59" ), new Hammer( "9:30" ) );         // (BOOLEAN) false
foo.isBetween( new Hammer( "12:59" ), new Hammer( "9:30" ), true );   // (BOOLEAN) true
foo.isBetween( new Hammer( "9:31" ), new Hammer( "12:59" ), true );   // (BOOLEAN) false
```

<br>
<br>

### Compare To <i>(Static)</i>
The Compare to Method can be used a static method, `Hammer.compareTo( Hammer1, Hammer2 )` or as an object method like `foo.compareTo( Hammer1 )`. Both will return the <b>difference in minutes</b> between the two times. You can pass a Hammer Object or Time String in both cases.

<b>The Math</b><br>
`Hammer1 - Hammer2` (Static)<br>
`foo - Hammer1` (Class)

<b>Parameters</b>
  - `_Hammer1` <i>(STRING/HAMMER)</i> => If ran as a class method with will be subtracted from `this`. If ran as static method `_Hammer2` will be subtracted from `_Hammer1`
  - `_Hammer2` <i>(STRING/HAMMER)</i> => <b>(Static Method Only)</b> If ran as static method `_Hammer2` will be subtracted from `_Hammer1`

<b>Return</b>
 - (INTEGER) => Difference between time `this` and `_Hammer` or if static the difference between `_Hammer1` and `_Hammer2`

<b>Example</b>
``` Javascript
// Javascript - Hammer has been imported
Hammer.compareTo( "12:02", "12:00" ); // returns (INT) 2
Hammer.compareTo( "12:00", "12:02" ); // returns (INT) -2
Hammer.compareTo( "11:00", "12:02" ); // returns (INT) -62
Hammer.compareTo( "12:00", "12:00" ); // returns (INT) 0
Hammer.compareTo( new Hammer( "12:00" ), "12:00" ); // returns (INT) 0
Hammer.compareTo( new Hammer( "12:00" ), new Hammer( "12:00" ) ); // returns (INT) 0


var foo = new Hammer( "9:30" );  // time set to 9:30
    foo.compareTo( "9:30" );     // returns (INT) 0
    foo.compareTo( "10:00" );    // returns (INT) -30
    foo.compareTo( "9:00" );     // returns (INT) 30

    foo.compareTo( new Hammer( "9:30" ) );     // returns (INT) 0
    foo.compareTo( new Hammer( "10:00" ) );    // returns (INT) -30
    foo.compareTo( new Hammer( "9:00" ) );     // returns (INT) 30

```

<br>
<br>

### Sort Array
Sorting an array using compareTo is super simple. You can either sort an array of Time Strings or of Hammer Objects.

<b>Example</b>
``` Javascript
// Javascript - Hammer has been imported
var hammerArray1 = [ new Hammer( "12:00" ), new Hammer( "13:00" ), new Hammer( "8:00" ), new Hammer( "7:58" ) ];
var hammerArray2 = [ "12:00", "13:00", "8:00", "7:58" ];

hammerArray1.sort( Hammer.compareTo );
hammerArray2.sort( Hammer.compareTo );
```

<hr>

## License
```
MIT License

Copyright (c) 2019 Polar Computers Inc.
Designed by Polar Computers Inc. for Pace Productivity Suite
Written by Evan Sellers, <sellersew@gmail.com>, September 2019

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

```

## Things to add
 - Set the time using a Time String with AM or PM
 - Testing JS Script

## Changelog
