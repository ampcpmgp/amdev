#cs ----------------------------------------------------------------------------

 AutoIt Version: 3.3.12.0
 Author:         myName

 Script Function:
	Template AutoIt script.

#ce ----------------------------------------------------------------------------

; Script Start - Add your code below here
 #include <Array.au3>
 #include <String.au3>

;init()
;getWindow()
;setWindow()
$filename = "info.txt"
$arrow = "=======>"
Opt("WinTitleMatchMode", 2)

Func init()
   If StringInStr(@ScriptFullPath, "exe") Then
	  Local $name = StringReplace(@ScriptFullPath, ".exe", "")
	  $filename = $name & ".txt"
   EndIf
   ;writeFile("mogura", $default_filename)
   ;consoleWrite(readFile($default_filename))
EndFunc

Func writeFile($file_name, $data)
   Local $file = FileOpen($file_name, 2)
   FileWrite($file, $data)
   FileClose($file)
EndFunc

Func readFile($file_name)
   Local $string
   Local $file = FileOpen($file_name)
   $string = FileRead($file)
   FileClose($file)
   Return $string
EndFunc

Func setWindow()
   Local $tmp_file = @AutoItExe & ".txt"
   ConsoleWrite($tmp_file)
   ;ToolTip($tmp_file)
   ;Sleep(1000)
   if FileExists($tmp_file) Then
	  $filename = $tmp_file
	  ;ToolTip($filename)
	  ;Sleep(1000)
   EndIf
   Local $data = readFile($filename)
   ;writeFile("mogura", $data)
   Local $data_lines = _StringExplode($data, @CR)
   ;_ArrayDisplay($data_lines)
   ;

   Local $aList = WinList()
  ; ConsoleWrite($aList[0][0] & @CRLF)
   For $i = 1 To $aList[0][0]
	  ;ConsoleWrite($i & @CRLF)
	  If $aList[$i][0] <> "" And BitAND(WinGetState($aList[$i][1]), 2) Then
		 Local $window_name = StringRegExpReplace($aList[$i][0], ".+\s-\s", "")
		 ;ConsoleWrite($i & ": " &$window_name & @CR)
		 #cs
		 Local $window_pos = WinGetPos($aList[$i][1])
		 If Not @error Then
			$data &= ($window_name & @tab & $window_pos[0] & "," & $window_pos[1] & "," & $window_pos[2] & "," & $window_pos[3] & @CRLF)
		 EndIf
		 #ce

		 ;
		 ;
		 ;
		 Local $i2 = -1
		 ;ConsoleWrite(UBound($data_lines) & @CRLF)
		 For $element In $data_lines
			;ConsoleWrite($element & @CRLF)
			$i2 += 1
			Local $info = _StringExplode($element, $arrow)
			;_ArrayDisplay($info)
			If UBound($info) < 2 Then ContinueLoop
			Local $title = $info[0]
			Local $pos = _StringExplode($info[8], ",")
			Local $x = $pos[0]
			Local $y = $pos[1]
			Local $w = $pos[2]
			Local $h = $pos[3]
			;ConsoleWrite($window_name & " --- " & $title & @CRLF)
			If $window_name = $title Then
			   ;Local $wnd = WinGetTitle($title)
			   Local $cur_pos = WinGetPos($aList[$i][1])
			   ;ConsoleWrite($title & "~~" & $x & " " & $y & " " & $w & " " & $h & "---" & $cur_pos[0] & " " & $cur_pos[1] & " " & $cur_pos[2] & " " & $cur_pos[3] & @CR)
			   If $y > -1000 Then
				  winmove($aList[$i][1], "", $x, $y, $w, $h, 1)
			   EndIf
			   _ArrayDelete($data_lines, $i2)
			   ExitLoop
			EndIf
		 Next
		 ;
		 ;
		 ;
	  EndIf
   Next

EndFunc

Func getWindow()
   ; Retrieve a list of window handles.
   Local $aList = WinList()

   ; Loop through the array displaying only visable windows with a title.
   Local $data = ""
   For $i = 1 To $aList[0][0]
	  If $aList[$i][0] <> "" And BitAND(WinGetState($aList[$i][1]), 2) Then
		 ;$data &= ( "Title: " & $aList[$i][0] & @CRLF & "Handle: " & $aList[$i][1])
		 Local $window_name = StringRegExpReplace($aList[$i][0], ".+\s-\s", "")
		 Local $window_pos = WinGetPos($aList[$i][1])
		 If Not @error Then
			Local $num = Int($window_pos[1])
			If $num > -1000 Then
			   $data &= ($window_name & $arrow & $window_pos[0] & "," & $window_pos[1] & "," & $window_pos[2] & "," & $window_pos[3] & @CR)
			EndIf
		 EndIf
		 ;$data &= ($aList[$i][0] & @CRLF)

	  EndIf
   Next

   writeFile("info.txt", $data)
EndFunc   ;==>Example
