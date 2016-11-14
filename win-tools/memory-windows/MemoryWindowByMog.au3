#cs ----------------------------------------------------------------------------

 AutoIt Version: 3.3.12.0
 Author:         myName

 Script Function:
	Template AutoIt script.

#ce ----------------------------------------------------------------------------

; Script Start - Add your code below here
 #include <Array.au3>
 #include <String.au3>
 #include <Process.au3>

$filename = "info.txt"
$arrow = "=======>"
Opt("WinTitleMatchMode", 2)

Func init()
   If StringInStr(@ScriptFullPath, "exe") Then
	  Local $name = StringReplace(@ScriptFullPath, ".exe", "")
	  $filename = $name & ".txt"
   EndIf
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
   if FileExists($tmp_file) Then
	  $filename = $tmp_file
   EndIf
   Local $data = readFile($filename)
   Local $data_lines = _StringExplode($data, @LF)

   Local $aList = WinList()
   For $i = 1 To $aList[0][0]
	  Local $hWnd = $aList[$i][1]
	  Local $iPID = WinGetProcess($hWnd)
	  Local $sName = _ProcessGetName($iPID)
	  If $aList[$i][0] <> "" And BitAND(WinGetState($hWnd), 2) Then
		 Local $window_name = StringRegExpReplace($aList[$i][0], ".+\s(-|\?)+\s", "")
		 Local $i2 = -1
		 For $element In $data_lines
			$i2 += 1
			Local $info = _StringExplode($element, $arrow)
			If UBound($info) < 2 Then ContinueLoop
			local $processInfo = _StringExplode($info[0], ",")
			Local $processName = $processInfo[0]
			Local $title = $processInfo[1]
			Local $pos = _StringExplode($info[1], ",")
			Local $x = $pos[0]
			Local $y = $pos[1]
			Local $w = $pos[2]
			Local $h = $pos[3]
			If $window_name = $title Or StringRegExp($window_name, $title&"$") Or $processName = $sName Then
			   Local $cur_pos = WinGetPos($hWnd)
			   If $y > -1000 Then
				  winmove($hWnd, "", $x, $y, $w, $h, 1)
			   EndIf
			   _ArrayDelete($data_lines, $i2)
			   ExitLoop
			EndIf
		 Next
	  EndIf
   Next

EndFunc

Func getWindow()
   Local $aList = WinList()
   Local $data = ""
   For $i = 1 To $aList[0][0]
	  Local $hWnd = $aList[$i][1]
	  If $aList[$i][0] <> "" And BitAND(WinGetState($hWnd), 2) Then
		 Local $window_name = StringRegExpReplace($aList[$i][0], ".+\s-\s", "")
		 Local $window_pos = WinGetPos($hWnd)
		 Local $iPID = WinGetProcess($hWnd)
		 Local $sName = _ProcessGetName($iPID)
		 If Not @error Then
			Local $num = Int($window_pos[1])
			If $num > -1000 Then
			   $data &= ($sName & "," & $window_name & $arrow & $window_pos[0] & "," & $window_pos[1] & "," & $window_pos[2] & "," & $window_pos[3] & @LF)
			EndIf
		 EndIf
	  EndIf
   Next

   writeFile("info.txt", $data)
EndFunc
