#!/bin/bash

##########################################################################
# Helper script to create JS API documentation for it001 project
##########################################################################
# 2016-04-07, PH
##########################################################################



#=========================================================================
# 1. Various constants

# 1.1. Path to target directory - where JSDoc will dump all generated files.
kJSDocDir=/home/peter/Documents/dev/teach/courses/ustegrew.github.io/doc/api

# 1.2. Path to Javascrip runner (Rhino engine). This will execute the JSDoc application
kJSRunExe=/home/peter/bin/apidocgen/jsdoc-toolkit/jsrun.jar

# 1.3. Path to the JSDoc application
kJSAppExe=/home/peter/bin/apidocgen/jsdoc-toolkit/app/run.js

# 1.4. Path to the template we use
kTemplDir=/home/peter/bin/apidocgen/jsdoc-toolkit/templates/jsdoc

# 1.5. Path to Javascript source files, from which we generate the documentation
  kSRCDir=/home/peter/Documents/dev/teach/courses/ustegrew.github.io/courses/it001


#=========================================================================
# 2. Synthesize command which we'll execute in the background
CMD="java -Djsdoc.template.dir=$kTemplDir -jar $kJSRunExe $kJSAppExe $kSRCDir -v -r -E=(/lib/dojo|/lib/ace/|lib/esprima|/lib/google-code-prettify|lib/pieroxy_lz-string) -a -p -d=$kJSDocDir"


#=========================================================================
# 3. Clear out old documentation, if exists.
echo "rm -fr $kJSDocDir"
rm -fr $kJSDocDir
echo "mkdir $kJSDocDir"
mkdir $kJSDocDir


#=========================================================================
# 4. Create documentation
echo $CMD
$CMD
