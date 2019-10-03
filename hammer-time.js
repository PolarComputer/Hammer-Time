/* Hammer Time - time library (v1.0.0)
 * Copyright (C) Polar Computers Inc. - All Rights Reserved (Project Pace)
 * MIT License
 * Written by Evan Sellers <sellersew@gmail.com>, October 2019
 */


export class Hammer {
  constructor( _time ) {
    this.hour = 0;
    this.minute = 0;

    if ( Hammer.isHammer( _time ) ) {
      this.set( _time );
    }
  }

  /* ================  SET TIME  =================
    This method allows you to set the time using
    a string. For example you can set it using
    a string. Like "24:00", or "12:00", "24:59",
    "9:00". These strings are checked using
    the static method `Hammer.isHammer( _time )`.
    You can also pass a Hammer Time Object to
    set the time.

    PARAMETER
      - (STRING) _time => A time string that is checked with `Hammer.isHammer()` to verify it is the correnct format
      - (HAMMER) _time => Set the time using a Hammer Time Object

    RETURN
      - The time that is resulting time set, in military time, using `this.get()`;

  */
  set( _time ) {
    if ( _time && Hammer.isHammer( _time ) ) {
      if ( _time instanceof Hammer ) {
        this.setHour( _time.getHour( true ) );
        this.setMinute( _time.getMinute( true ) );
      } else {
        let tmpTime = _time.split(':');
        this.setHour( parseInt( tmpTime[ 0 ] ) );
        this.setMinute( parseInt( tmpTime[ 1 ] ) );
      }
      return this.get();
    }
    return this.get();
  }

  /* ================  SET HOUR  =================
    This method allows you to set the hour, you
    can either set it using an integer between,
    0-24. You can either set the hour using a
    string like `"12"` or an integer like `8`.
    If you plug in `0`, it acts the same as 24.

    PARAMETER
      - (STRING) _hour => Set the hour using a string, which is converted
      - (INTEGER) _hour => Set the hour using a integer, which is converted

    RETURN
      - The time that is resulting hour time set, in military time, using `this.getHour()`;

  */
  setHour( _hour ) {
    if ( _hour instanceof String || typeof _hour === 'string' ) {
      _hour = parseInt( _hour );
    }
    if ( Number.isInteger( _hour ) && _hour > 0 && _hour <= 24 ) {
      this.hour = _hour;
    }
    if ( Number.isInteger( _hour ) && _hour == 0  ) {
      this.hour = 24;
    }
    return this.getHour();
  }

  /* ===============  SET MINUTE  ================
    This method allows you to set the minute, you
    can either set it using an integer between,
    0-59. You can either set the hour using a
    string like `"09"` or an integer like `12`.

    PARAMETER
      - (STRING) _minute => Set the minute using a string, which is converted
      - (INTEGER) _minute => Set the minute using a integer, which is converted

    RETURN
      - The time that is resulting minute time set, in military time, using `this.getMinute()`;

  */
  setMinute( _minute ) {
    if ( _minute instanceof String || typeof _minute === 'string' ) {
      _minute = parseInt( _minute );
    }
    if ( Number.isInteger( _minute ) && _minute >= 0 && _minute < 60 ) {
      this.minute = _minute
    }
    return this.getMinute();
  }

  /* ================  GET TIME  =================
    This method will return the current set time,
    as a string in military time format.

    RETURN
      - (STRING) => current set time, in military format

  */
  get() {
    return this.getHour() + ":" + this.getMinute();
  }

  /* ================  GET HOUR  =================
    This method will return the current set hour.
    It will return in military format. It will
    also add a zero if the number is smaller than
    10. Ex. `8` => `"08"`

    RETURN
      - (STRING) => current set hour, in military format

  */
  getHour( _int ) {
    if ( !_int ) {
      if ( this.hour < 10 ) {
        return "0" + this.hour;
      }
      return this.hour + "";
    }
    return this.hour;
  }

  /* ===============  GET MINUTE  ================
    This method will return the current set minute.
    It will also add a zero if the number is
    smaller than 10. Ex. `8` => `"08"`

    RETURN
      - (STRING) => current set minute

  */
  getMinute( _int ) {
    if ( !_int ) {
      if ( this.minute < 10 ) {
        return "0" + this.minute;
      }
      return this.minute + "";
    }
    return this.minute;
  }

  /* ===========  INSTANCE OF HAMMER  ============
    This method return a boolean telling you if
    the paramater that you passed is either a
    instance of Hammer, or if the String you passed
    is a valid military time format. A time string
    is build like "11:00" or "15:59". It is in
    military time and has no AM or PM attached.

    PARAMETER
      - _time (STRING) => will check if it is time format
      - _time (HAMMER) => will check if is Instance of Hammer

    RETURN
      - (BOOLEAN) `true` => if the parm passed is an instance of Hammer or is a valid time string
      - (BOOLEAN) `false` => if it's NOT a instance of HAMMER or a valid time string

  */
  static isHammer( _time ) {
    return /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test( _time ) || _time instanceof Hammer;
  }

  /* ================  ADD TIME  =================
    This will add a specific amount of time to the
    date. You can pass this time as either a string
    or an integer. If you add more minuts than in
    in a hour it will loop and if you add more hours
    than in a days it will loop to the start again.

    PARAMETER
      - _amount (STRING/INTEGER) => Ammount of time to be added
      - _base (STRING) => pass either `"hour"`, `"h"`, or `"hours"` to add by hours or pass `"min"`, `"m"`, `"minute"`, "`minutes`" to add by minutes

    RETURN
      - (STRING) time => time set after opertation, retuned in military time using `this.get()`

  */
  add( _amount, _base ) {
    _base.toLowerCase();
    if ( _amount instanceof String || typeof _amount === 'string' ) {
      _amount = parseInt( _amount );
    }
    if ( _base == "hour" || _base == "h" || _base == "hours" ) {
      this.setHour( ( ( this.getHour( true ) + _amount ) % 24 ) );
    } else if ( _base == "min" || _base == "m" || _base == "minutes" || _base == "minute" ) {
      if ( ( ( this.getMinute( true ) + _amount ) / 60 ) > 1 ) {
        this.add( Math.floor( ( this.getMinute( true ) + _amount ) / 60 ), "hour" );
      }
      this.setMinute( ( ( this.getMinute( true ) + _amount ) % 60 ) );
    }
    return this.get();
  }

  /* ==============  SUBTRACT TIME  ==============
    This will subtract a specific amount of time to the
    date. You can pass this time as either a string
    or an integer. If you subtract more minuts than in
    in a hour it will loop and if you subtract more hours
    than in a days it will loop to the start again.

    PARAMETER
      - _amount (STRING/INTEGER) => Ammount of time to be subtracted
      - _base (STRING) => pass either `"hour"`, `"h"`, or `"hours"` to subtract by hours or pass `"min"`, `"m"`, `"minute"`, "`minutes`" to subtract by minutes

    RETURN
      - (STRING) time => time set after opertation, retuned in military time using `this.get()`

  */
  subtract( _amount, _base ) {
    _base.toLowerCase();
    if ( _amount instanceof String || typeof _amount === 'string' ) {
      _amount = parseInt( _amount );
    }
    if ( _base == "hour" || _base == "h" || _base == "hours" ) {
      if ( ( this.getHour( true ) - _amount ) % 24 < 0 ) {
        this.setHour( ( ( this.getHour( true ) - _amount ) % 24 ) + 24 );
      } else {
        this.setHour( ( this.getHour( true ) - _amount ) % 24 );
      }
    } else if ( _base == "min" || _base == "m" || _base == "minutes" || _base == "minute" ) {
      if ( ( ( this.getMinute( true ) - _amount ) / 60 ) < 1 ) {
        this.subtract( Math.ceil( Math.abs( ( this.getMinute( true ) - _amount ) / 60 ) ), "hour" );
      }

      if ( ( this.getMinute( true ) - _amount ) % 60 < 0 ) {
        this.setMinute( ( ( this.getMinute( true ) - _amount ) % 60 ) + 60 );
      } else {
        this.setMinute( ( this.getMinute( true ) - _amount ) % 60 );
      }
    }
    return this.get();
  }

  /* ================  EQUAL TO  =================
    This will see if a time, as either a string
    or a Hammer Object is equal.

    PARAMETER
      - _Hammer (STRING/HAMMER) => The time string to Hammer object that is compared against

    RETURN
      - (BOOLEAN) `true` => if the Hammer Object or Time String is equal
      - (BOOLEAN) `false` => if the Hammer Object or TIme String is NOT equal

  */
  equals( _Hammer ) {
    if ( _Hammer && !(_Hammer instanceof Hammer) && Hammer.isHammer( _Hammer ) ) {
      _Hammer = new Hammer( _Hammer );
    }
    if ( _Hammer && _Hammer instanceof Hammer ) {
      return ( _Hammer.getHour( true ) == this.getHour( true ) && _Hammer.getMinute( true ) == this.getMinute( true ) ) ? true : false;
    }
    return false;
  }

  /* ===============  COMPARE TO  ================ (STATIC)
    All this does is compare two Hammer or time
    String objects. You can either pass it a
    Hammer Object or a Time string and it will
    return the difference in minutes.

    PARAMETER
      - a (STRING/HAMMER) => Time String or Hammer Object `a` that is compared to `b`
      - b (STRING/HAMMER) => Time String or Hammer Object `a` that is compared to `b`

    RETURN
      - (INTEGER) => Difference between time `a` and `b` in minutes

  */
  static compareTo( a, b ) {
    if ( a && !(a instanceof Hammer) && Hammer.isHammer( a ) ) {
      a = new Hammer( a );
    }
    if ( b && !(b instanceof Hammer) && Hammer.isHammer( b ) ) {
      b = new Hammer( b );
    }
    if ( a.equals( b ) ) {
      return 0;
    }
    return ( ( a.getHour( true ) * 60 ) + a.getMinute( true ) ) - ( ( b.getHour( true ) * 60 ) + b.getMinute( true ) )
  }

  /* ===============  COMPARE TO  ================
    All this does is compare two Hammer or time
    String objects. You can either pass it a
    Hammer Object or a Time string and it will
    return the difference in minutes. This is
    a bit different than the static function as
    it compares with and the parameter that is
    passed.

    PARAMETER
      - _Hammer (STRING/HAMMER) => Time String or Hammer Object `this` that is compared to `_Hammer`

    RETURN
      - (INTEGER) => Difference between time `this` and `_Hammer` in minutes

  */
  compareTo( _Hammer ) {
    return Hammer.compareTo( this, _Hammer );
  }

  /* ===============  IS BETWEEN  ================
  This will check to see if a time is between, two
  other times. Plus you don't have to worry about
  getthing them in the right order. This function
  will make sure they are in the right order. By
  default it will not check to see if the the time
  is equal to it, if you pass the `true` boolean
  in the _orEqual paramater it will check if it
  is equal too. You can either pass a time string
  or a Hammer Object.

    PARAMETER
      - _Start (STRING/HAMMER) => Is the starting time that is checked to see if `this` is between
      - _End (STRING/HAMMER) => Is the ending time that is checked to see if `this` is between
      - _orEqual (BOOLEAN) => if set to true will also return true if `this` is equal to the start or end

    RETURN
      - (BOOLEAN) `true` => if the `this` time is between the start and end
      - (BOOLEAN) `false` => if the `this` isn't between the start and end

  */
  isBetween( _Start, _End, _orEqual ) {
    if ( _Start && !(_Start instanceof Hammer) && Hammer.isHammer( a ) ) {
      _Start = new Hammer( _Start );
    }
    if ( _End && !(_End instanceof Hammer) && Hammer.isHammer( b ) ) {
      _End = new Hammer( _End );
    }
    if ( _Start && _Start instanceof Hammer && _End && _End instanceof Hammer ) {
      if ( _Start.compareTo( _End ) > 0 ) {
        let tmpSwap = _Start;
        _Start = _End;
        _End = tmpSwap;
      }
      if ( ( !_orEqual && this.compareTo( _Start ) > 0 && this.compareTo( _End ) < 0 ) || ( _orEqual && this.compareTo( _Start ) >= 0 && this.compareTo( _End ) <= 0 ) ) {
        return true;
      }
    }
    return false;
  }

  /* ==============  CURRENT TIME  ================ (STATIC)
  This will return the current time, in military
  format.

    RETURN
      - (STRING) => the current time, in military time

  */
  static now() {
    let now = new Date();
    return new Hammer( now.getHours() + ":" + now.getMinutes() ).get();
  }

  /* ============== TO STRING RANGE ===============
    This will convert one or two time string or Hammer
    objects to a visible. It will convert
    them to a 12 hour format with AM or PM. Also if
    you pass it a range it will make them appear the
    best way.

    EXAMPLES
      - ( "10:00", "11:00" ) => "10:00-11:00AM"
      - ( "13:00", "15:00" ) => "2:00-3:00PM"
      - ( "10:00", "16:00" ) => "10:00AM-4:00PM"
      - ( "11:00" ) => "11:00AM"
      - ( "20:00" ) => "8:00PM"

    PARAMETER
      - _End (STRING/HAMMER) => the end time range (NOT REQUIRED)

    RETURNS
      - (STRING) => will be structured like examples above as string
  */
  toString( _End ) {
    if ( _End && !(_End instanceof Hammer) && Hammer.isHammer( _End ) ) {
      _End = new Hammer( _End );
    }
    if ( _End && _End instanceof Hammer ) {
      let _Start = this;
      if ( _Start.compareTo( _End ) > 0 ) {
        let tmpSwap = _Start;
        _Start = _End;
        _End = tmpSwap;
      }
      if ( ( _Start.getHour( true ) >= 12 && _End.getHour( true ) >= 12 ) || ( _Start.getHour( true ) < 12 && _End.getHour( true ) < 12 ) ) {
        return ( ( _Start.getHour( true ) % 12 == 0 ) ? "12" : _Start.getHour( true ) % 12 ) + ( ( _Start.getMinute( true ) == 0 ) ? "" : ":" + _Start.getMinute() ) + "-" + ( ( _End.getHour( true ) % 12 == 0 ) ? "12" : _End.getHour( true ) % 12 ) + ( ( _Start.getMinute( true ) == 0 && _End.getMinute( true ) == 0 ) ? "" : ":" + _End.getMinute() ) + ( ( _Start.getHour( true ) < 12 || _Start.getHour( true ) === 24) ? "am" : "pm" );
      } else {
        return ( ( _Start.getHour( true ) % 12 == 0 ) ? "12" : _Start.getHour( true ) % 12 ) + ( ( _Start.getMinute( true ) == 0 ) ? "" : ":" + _Start.getMinute() ) + ( ( _Start.getHour( true ) < 12 || _Start.getHour( true ) === 24) ? "am" : "pm" ) + "-" + ( ( _End.getHour( true ) % 12 == 0 ) ? "12" : _End.getHour( true ) % 12 ) + ( ( _Start.getMinute( true ) == 0 && _End.getMinute( true ) == 0 ) ? "" : ":" + _End.getMinute() ) + ( ( _End.getHour( true ) < 12 || _End.getHour( true ) === 24 ) ? "am" : "pm" );
      }
    }
    return ( ( this.getHour( true ) % 12 == 0 ) ? "12" : this.getHour( true ) % 12 ) + ( ( this.getMinute( true ) == 0 ) ? "" : ":" + this.getMinute() ) + ( ( this.getHour( true ) < 12 || this.getHour( true ) === 24 ) ? "am" : "pm" );
  }

}
