### Turing machine

 As you probably know, a classic implementation (and this one too) of turing machine contains of 3 separate parts:
  - control unit
  - read-write head
  - tape

First of all, you should adjust the control unit to perform specific function providing a configuration object.
This is how it can looks in case of ``` f(x) = x mod 4 ``` function.

  ```
  {
    "initialState": "start",
    "finalState": "stop",
    "states": ["start", "stop", "q1", "q2", "q3", "q4"],
    "alphabet": ["#", "1"],
    "transitions": {
        "start;#": "start;#;R",
        "start;1": "q1;#;R",
        "q1;1": "q2;#;R",
        "q2;1": "q3;#;R",
        "q3;1": "q4;#;R",
        "q4;1": "q1;#;R",
        "q4;#": "stop;#;R",
        "q3;#": "q2;1;R",
        "q2;#": "q1;1;R",
        "q1;#": "stop;1;R"
    }
 }
 ```

  The only thing that is worth to be mentioned about a tape is it is nothing more than ordinary file.

  The next piece of code demonstrates how to use directly TuringMaching class.
  ```
  import {TuringMachine} from 'turing-machine/lib';
  const PATH_TO_TAPE = __dirname + '/line.txt';

  let machine = new TuringMachine(configuration, PATH_TO_TAPE);
  ```
  Before you run the machine just put initial data into the tape (in case of curent example, it might something like "111111")
  
  When all preparations are done just run the maching calling
  ```machine.run(); ```
