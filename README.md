Semi-Automated Refactoring of BPMN Processes.
=============================================

This repository contains the source code of a tool allowing a user to optimise a BPMN process
enhanced with time and resources.
This code is embedded in a JAR file that is executed in the backend of a NodeJS server that one
can run locally.
To use this tool, one should clone the actual repository on his machine.

Repository hierarchy
=============================================

* ''EXAMPLES'' folder: contains several handcrafted and real-world examples on which the approach
can be used.

* ''FORMALISM'' folder: contains the formalism of the notions presented in the paper ''Semi-Automated
Refactoring of BPMN Processes'' submitted to the [Software Quality, Reliability and Security (QRS) 2024](https://qrs24.techconf.org/)
conference.

* ''TOOL'' folder: contains the tool that one can download and try locally on his machine.

* ''LICENSE.txt'' file: details the license under which this software is distributed

* ''README.md'' file: presents general information about this repository

Required Softwares
=============================================

* [NodeJS](https://nodejs.org/en/download)
* [Java](https://www.java.com/)
*

Server setup
=============================================

* Go to the ``TOOL'' folder.
* Run the ``npm install'' command to install all the necessary node modules.
* Go to the ``src'' folder.
* Run the ``npx nodemon main.js'' command to start the server.
* In case of errors, fix them.
* The server should now [be running locally on port 3003](http://localhost:3003).

Tool usage
=============================================

* The user must first upload the process, and optionally its dependencies and the global information
of the system.
  * BPMN file: Each task of the BPMN process must have a name, a duration, and the list of
required resources, with the following syntax: ``name (duration) <1 resource_1, 3 resource_2, ...>''.
Examples can be found in the "EXAMPLES" folder of this project.

  * (Optional) Dependencies file: The user can upload a dependency file containing the dependencies
between tasks of the process that must be preserved by the refactoring operations. If provided, this file must
contain tuples of tasks written line per line. For example, if task T1 must be executed before
task T2, the following tuple should appear on a line of the dependency file: ``(T1,T2)''. If no
such file is provided, all the original dependencies between tasks of the process may be broken by
the refactoring approach. Examples can be found in the "EXAMPLES" folder of this project.

  * (Optional) Global information: The user can upload a global information file containing the
global information that the system must know in order to perform the internal computations.
This file, if provided, must contain:
    * On the first line: ``- IAT: [RealDistribution type (const, normal, exp, ...)], [first_parameter_of_the_distribution], [second_parameter_of_the_distribution]''
    * On the second line: ``- Nb instances: [number of instances required]''
    * On the third and last line: ``- Global resources: <[nb replicas of resource one] [name of resource one] ([cost of resource one]), ...>''
If not provided, these information will be automatically generated by the tool. Examples can be
found in the "EXAMPLES" folder of this project.

* Once selected, these files can be uploaded using the ``Upload'' button, and the original BPMN process
is rendered on the screen with a proposal concerning the task to move.

* The user can then decide whether he wants to move this particular task or not.

* If yes, a new process in which this task has been moved is displayed below the previous one, along
with the AET and the gain of this new process.

* If no, a new task is proposed to the user.

* When a new process is proposed to the user, it can either be accepted or declined by the user.

* If it is accepted, it becomes the main process for the next computations.

* Otherwise, it is discarded and a new step starts.
 
License
=============================================

This tool is distributed as-is and without warranty of any kind under the [CeCILL license](https://github.com/QuentinNivon/Step-by-Step_Refactoring/tree/main/LICENSE.txt).
