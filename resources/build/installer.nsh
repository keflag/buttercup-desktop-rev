!macro customInstall
  DetailPrint "Register Buttercup-Rev URI Handler"
  DeleteRegKey HKCR "Buttercup-Rev"
  WriteRegStr HKCR "Buttercup-Rev" "" "URL:Buttercup-Rev"
  WriteRegStr HKCR "Buttercup-Rev" "URL Protocol" ""
  WriteRegStr HKCR "Buttercup-Rev\DefaultIcon" "" "$INSTDIR\${APP_EXECUTABLE_FILENAME}"
  WriteRegStr HKCR "Buttercup-Rev\shell" "" ""
  WriteRegStr HKCR "Buttercup-Rev\shell\Open" "" ""
  WriteRegStr HKCR "Buttercup-Rev\shell\Open\command" "" "$INSTDIR\${APP_EXECUTABLE_FILENAME} %1"
!macroend
