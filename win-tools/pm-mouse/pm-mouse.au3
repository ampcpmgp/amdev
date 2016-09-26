#AutoIt3Wrapper_icon=C:\autoit\mylib\auto_mouse\mouse.ico

#include <GUIConstantsEx.au3>
#include <WindowsConstants.au3>
#include <Misc.au3>
#include <String.au3>
#include "MouseOnEvent.au3"

Opt("TrayMenuMode", 3)
;Opt("GUIOnEventMode", 1)

Local $idNotepad, $idClose1, $input, $start, $timer, $word, $hGUI, $record_start_flag, $record_finish_flag, $idExit, $label, $input2
Dim $arr[2], $tmp_arr[2]
Local $sleep_time = 5
Example()


Func mouseUpLeft()
   $time = TimerDiff($timer)
   $word &= $time & ",up,left," & $arr[0] & "," & $arr[1] & @CRLF
   $timer = TimerInit()
EndFunc
Func mouseUpRight()
   $time = TimerDiff($timer)
   $word &= $time & ",up,right," & $arr[0] & "," & $arr[1] & @CRLF
   $timer = TimerInit()
EndFunc
Func mouseDownLeft()
   $record_start_flag = True
   $time = TimerDiff($timer)
   $word &= $time & "," & "left," & $arr[0] & "," & $arr[1] & @CRLF
   $timer = TimerInit()
   ;ConsoleWrite("left down"&@CRLF)
EndFunc
Func mouseDownRight()
   $record_start_flag = True
   $time = TimerDiff($timer)
   $word &= $time & "," & "right," & $arr[0] & "," & $arr[1] & @CRLF
   $timer = TimerInit()
   ;ConsoleWrite("right down"&@CRLF)
EndFunc

Func Record()
   GUICtrlSetState($idNotepad, $GUI_DISABLE)
   GUICtrlSetState($start, $GUI_DISABLE)
   ConsoleWrite("Record")
   ;
   $timer = TimerInit()
   _MouseSetOnEvent($MOUSE_PRIMARYDOWN_EVENT, mouseDownLeft)
   _MouseSetOnEvent($MOUSE_PRIMARYUP_EVENT, mouseUpLeft)

   _MouseSetOnEvent($MOUSE_SECONDARYDOWN_EVENT, mouseDownRight)
   _MouseSetOnEvent($MOUSE_SECONDARYUP_EVENT, mouseUpRight)

   $file = FileOpen("mouse_data", 2)
   $word = ""
   $record_start_flag = False


   While True
	  Sleep(10)
	  If _IsPressed("1B") Then ExitLoop
		 ;
	  $arr = MouseGetPos()
	  $time = TimerDiff($timer)
	  $word &= $time & "," & $arr[0] & "," & $arr[1] & @CRLF
	  $timer = TimerInit()
   WEnd

   FileWrite($file, $word)
   FileClose($file)
EndFunc

Func Stop()
   HotKeySet("{esc}")
   _MouseSetOnEvent($MOUSE_PRIMARYDOWN_EVENT)
   _MouseSetOnEvent($MOUSE_PRIMARYUP_EVENT)

   _MouseSetOnEvent($MOUSE_PRIMARYDOWN_EVENT)
   _MouseSetOnEvent($MOUSE_SECONDARYUP_EVENT)
   ;
   GUICtrlSetState($idNotepad, $GUI_ENABLE)
   GUICtrlSetState($start, $GUI_ENABLE)
   ConsoleWrite("Stop")
EndFunc

Func Stop2()
   HotKeySet("{esc}")
   If $record_start_flag Then
	  _MouseSetOnEvent($MOUSE_PRIMARYDOWN_EVENT)
	  _MouseSetOnEvent($MOUSE_PRIMARYUP_EVENT)

	  _MouseSetOnEvent($MOUSE_PRIMARYDOWN_EVENT)
	  _MouseSetOnEvent($MOUSE_SECONDARYUP_EVENT)
	  $record_start_flag = False
	  $record_finish_flag = True
   Else

   EndIf
   GUICtrlSetState($idNotepad, $GUI_ENABLE)
   GUICtrlSetState($start, $GUI_ENABLE)
EndFunc

Func Start()
   HotKeySet("{esc}", "Stop2")
   GUICtrlSetState($idNotepad, $GUI_DISABLE)
   GUICtrlSetState($start, $GUI_DISABLE)
   $num = Int(GUICtrlRead($input))
   ConsoleWrite("Start - Num" & $num)
   If $num = 0 Then $num += 1
   ;
   $move_num = 1
   ;
   While $num
	  WinSetTitle($hGUI, "", "午後のマウス　＠" & $num & "回")
	  $file = FileOpen("mouse_data")
	  ;
	  While True
		 If _IsPressed("1B") Then ExitLoop
			;
		 $mouse = FileReadLine($file)
		 If @error Then ExitLoop
		 $MouseArr = _StringExplode($mouse, ",")
		 ;Sleep($MouseArr[0])
		 If $MouseArr[1] = "left" or $MouseArr[1] = "right" Then
			MouseMove($MouseArr[2], $MouseArr[3], $move_num)
			MouseDown($MouseArr[1])
		 ElseIf $MouseArr[1] = "up" Then
			MouseMove($MouseArr[3], $MouseArr[4], $move_num)
			MouseUp($MouseArr[2])
		 Else
			MouseMove($MouseArr[1], $MouseArr[2], $move_num)
		 EndIf
		 ;ConsoleWrite($mouse&@crlf)
	  WEnd
	  $num -= 1
   WEnd
   FileClose($file)

   WinSetTitle($hGUI, "", "午後のマウス")
   Stop2()

EndFunc

Func SpecialEvents()
   If _IsPressed("1B") Then
	  Stop2()
	  Return
   EndIf
   Exit
EndFunc

Func Example()

    ; Create a GUI with various controls.
    $hGUI = GUICreate("午後のマウス", 300, 50)
	;WinSetOnTop($hGUI, "", 1)
	TraySetIcon(@LocalAppDataDir&"mouse.ico")
	GUISetIcon(@LocalAppDataDir&"mouse.ico")
    GUISetOnEvent($GUI_EVENT_CLOSE, "SpecialEvents")


   $idNotepad = GUICtrlCreateButton("記録", 0, 0)
   $idClose1 = GUICtrlCreateButton("停止(ESC)", 60, 0)
   $input = GUICtrlCreateInput( "", 130, 0)
   GUICtrlCreateUpdown($input)
   $start = GUICtrlCreateButton("開始", 220, 0)

   $label = GUICtrlCreateLabel("間隔(秒指定)", 0, 30)
   $input2 = GUICtrlCreateInput( "", 80, 25)
   GUICtrlSetData($input2, 0)

   ;GUICtrlSetOnEvent($idNotepad, "Record")
   ;GUICtrlSetOnEvent($idClose1, "Stop")
   ;GUICtrlSetOnEvent($start, "Start")
   $idExit = TrayCreateItem("終了")

    ; Display the GUI.
    GUISetState(@SW_SHOW, $hGUI)

    ;Local $hChild = GUICreate("", 169, 68, 20, 20, $WS_POPUP, BitOR($WS_EX_LAYERED, $WS_EX_MDICHILD), $hGUI)

    ; Create a picture control with a transparent image.

    ; Display the child GUI.
    GUISetState(@SW_SHOW)

    ; Loop until the user exits.
   While 1
	  Switch TrayGetMsg()
		 Case $idExit ; Exit the loop.
			Exit
	  EndSwitch
	  ;
	  Switch GUIGetMsg()
	  Case $GUI_EVENT_CLOSE
		 If _IsPressed("1B") Then ContinueLoop
		 ;FileDelete("mouse_data")
		 ExitLoop
	  Case $idNotepad
		 HotKeySet("{esc}", "Stop2")
		 ConsoleWrite("Record 2")
		 GUICtrlSetState($idNotepad, $GUI_DISABLE)
		 GUICtrlSetState($start, $GUI_DISABLE)
		 ControlFocus($hGUI, "", $idClose1)
		 ;
		 $timer = TimerInit()
		 _MouseSetOnEvent($MOUSE_PRIMARYDOWN_EVENT, mouseDownLeft)
		 _MouseSetOnEvent($MOUSE_PRIMARYUP_EVENT, mouseUpLeft)

		 _MouseSetOnEvent($MOUSE_SECONDARYDOWN_EVENT, mouseDownRight)
		 _MouseSetOnEvent($MOUSE_SECONDARYUP_EVENT, mouseUpRight)

		 $file = FileOpen("mouse_data", 2)
		 $word = ""
		 $record_start_flag = True
	  Case $idClose1
		 ConsoleWrite("Stop 2")
		 Stop2()
	  Case $start
		 HotKeySet("{esc}", "Stop2")
		 ConsoleWrite("Start 2")
		 GUICtrlSetState($idNotepad, $GUI_DISABLE)
		 GUICtrlSetState($start, $GUI_DISABLE)
		 ControlFocus($hGUI, "", $idClose1)
		 $num = Int(GUICtrlRead($input))
		 If $num = 0 Then $num += 1
		 ;
		 $move_num = 1
		 ;
		 While $num
			$time = Int(GUICtrlRead($input2))
			ConsoleWrite(@CRLF&$time)
			WinSetTitle($hGUI, "", "＠" & $num & "回　待機(" & $time & ")秒 動作中")

			$file = FileOpen("mouse_data")
			;
			$down_type = False

			While True
				  ;
			   $mouse = FileReadLine($file)
			   If @error Then ExitLoop
			   $MouseArr = _StringExplode($mouse, ",")
			   Sleep($MouseArr[0])
			   ;If Int($MouseArr[0]) > 10 Then Sleep(Int($MouseArr[0]))
			   ;ConsoleWrite($MouseArr[0]&@crlf)
			   If $MouseArr[1] = "left" or $MouseArr[1] = "right" Then
				  MouseMove($MouseArr[2], $MouseArr[3], $move_num)
				  MouseDown($MouseArr[1])
				  $down_type = $MouseArr[1]
			   ElseIf $MouseArr[1] = "up" Then
				  MouseMove($MouseArr[3], $MouseArr[4], $move_num)
				  MouseUp($MouseArr[2])
				  $down_type = False
			   Else
				  MouseMove($MouseArr[1], $MouseArr[2], $move_num)
			   EndIf
			   ;ConsoleWrite($mouse&@crlf)
			   If _IsPressed("1B") Then ExitLoop
			WEnd
			If _IsPressed("1B") Then ExitLoop
			$num -= 1

			$timer = TimerInit()

			$time *= 1000
			$_flag = False
			While $time
			   If _IsPressed("1B") Then
				  $_flag = True
				  ExitLoop
			   EndIf

			   Sleep(250)
			   WinSetTitle($hGUI, "", "＠" & $num & "回　待機(" & Int($time/1000) & ")秒 停止中")
			   $time -= 250
			WEnd

			ConsoleWrite(@CRLF & timerDiff($timer))


			if $_flag then ExitLoop



		 WEnd
		 If $down_type Then
			MouseUp($down_type)
		 EndIf

		 Stop2()
		 FileClose($file)

		 WinSetTitle($hGUI, "", "午後のマウス")
	  Case Else
		 If $record_start_flag Then
			If _IsPressed("1B") Then
			   Stop2()
			Else
			   $arr = MouseGetPos()
			   If $tmp_arr[0] = $arr[0] And $tmp_arr[1] = $arr[1] Then
				  ;
			   Else
				  $tmp_arr = $arr
				  $time = TimerDiff($timer)
				  $word &= $time & "," & $arr[0] & "," & $arr[1] & @CRLF
				  $timer = TimerInit()
			   EndIf
			EndIf
		 ElseIf $record_finish_flag Then
			FileWrite($file, $word)
			FileClose($file)
			$record_finish_flag = False
		 ;

		 EndIf
	  EndSwitch

	  Switch TrayGetMsg()
		 Case $idExit ; Exit the loop.
			Exit
	  EndSwitch
	  Sleep(1)
   WEnd

    ; Delete the previous GUIs and all controls.
    GUIDelete($hGUI)

EndFunc   ;==>Example
