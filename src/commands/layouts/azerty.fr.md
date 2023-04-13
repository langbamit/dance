# Commands: `azerty`

<details>
<summary><b>Quick reference</b></summary>
<table>
<thead>
<tr>
<th>Category</th><th>Identifier</th><th>Title</th><th>Default keybindings</th>
</tr>
</thead>
<tbody>
<tr><td rowspan=1><a href="#bracket"><code>bracket</code></a></td><td><a href="#bracket.openLeftBracket"><code>bracket.openLeftBracket</code></a></td><td>Open window menu</td><td></td></tr>
<tr><td rowspan=2><a href="#dev"><code>dev</code></a></td><td><a href="#dev.copyLastErrorMessage"><code>dev.copyLastErrorMessage</code></a></td><td>Copies the last encountered error message</td><td></td></tr>
<tr><td><a href="#dev.setSelectionBehavior"><code>dev.setSelectionBehavior</code></a></td><td>Set the selection behavior of the specified mode</td><td></td></tr>
<tr><td rowspan=32><a href="#edit"><code>edit</code></a></td><td><a href="#edit.align"><code>edit.align</code></a></td><td>Align selections</td><td><code>Shift+7</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)<code>Shift+7</code> (<code>editorTextFocus && dance.mode == 'select'</code>)</td></tr>
<tr><td><a href="#edit.alignByOffet"><code>edit.alignByOffet</code></a></td><td>Align selections by offset from start character (negative offset)</td><td><code>Ctrl+Shift+7</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)<code>Ctrl+Shift+7</code> (<code>editorTextFocus && dance.mode == 'select'</code>)</td></tr>
<tr><td><a href="#edit.case.swap"><code>edit.case.swap</code></a></td><td>Swap case</td><td><code>Shift+`</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)<code>Shift+`</code> (<code>editorTextFocus && dance.mode == 'select'</code>)</td></tr>
<tr><td><a href="#edit.case.toLower"><code>edit.case.toLower</code></a></td><td>Transform to lower case</td><td><code>`</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)<code>`</code> (<code>editorTextFocus && dance.mode == 'select'</code>)</td></tr>
<tr><td><a href="#edit.case.toUpper"><code>edit.case.toUpper</code></a></td><td>Transform to upper case</td><td><code>Alt+`</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)<code>Alt+`</code> (<code>editorTextFocus && dance.mode == 'select'</code>)</td></tr>
<tr><td><a href="#edit.copyIndentation"><code>edit.copyIndentation</code></a></td><td>Copy indentation</td><td><code>Shift+Alt+7</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)<code>Shift+Alt+7</code> (<code>editorTextFocus && dance.mode == 'select'</code>)</td></tr>
<tr><td><a href="#edit.deindent"><code>edit.deindent</code></a></td><td>Deindent selected lines</td><td><code>Shift+Alt+,</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)<code>Shift+Alt+,</code> (<code>editorTextFocus && dance.mode == 'select'</code>)</td></tr>
<tr><td><a href="#edit.deindent.withIncomplete"><code>edit.deindent.withIncomplete</code></a></td><td>Deindent selected lines (including incomplete indent)</td><td><code>Shift+,</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)<code>Shift+,</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)</td></tr>
<tr><td><a href="../edit.ts#L59"><code>edit.delete</code></a></td><td>Delete</td><td><code>Alt+D</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)<code>Alt+D</code> (<code>editorTextFocus && dance.mode == 'select'</code>)</td></tr>
<tr><td><a href="../edit.ts#L60"><code>edit.delete-insert</code></a></td><td>Delete and switch to Insert</td><td><code>Alt+C</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)<code>Alt+C</code> (<code>editorTextFocus && dance.mode == 'select'</code>)</td></tr>
<tr><td><a href="../edit.ts#L460"><code>edit.newLine.above.insert</code></a></td><td>Insert new line above and switch to insert</td><td><code>Shift+O</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)<code>Shift+O</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)</td></tr>
<tr><td><a href="../edit.ts#L504"><code>edit.newLine.below.insert</code></a></td><td>Insert new line below and switch to insert</td><td><code>O</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)<code>O</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)</td></tr>
<tr><td><a href="../edit.ts#L52"><code>edit.paste.after</code></a></td><td>Paste after</td><td><code>P</code> (<code>editorTextFocus && dance.mode == 'select'</code>)</td></tr>
<tr><td><a href="../edit.ts#L54"><code>edit.paste.after.select</code></a></td><td>Paste after and select</td><td><code>P</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)</td></tr>
<tr><td><a href="../edit.ts#L51"><code>edit.paste.before</code></a></td><td>Paste before</td><td><code>Shift+P</code> (<code>editorTextFocus && dance.mode == 'select'</code>)</td></tr>
<tr><td><a href="../edit.ts#L53"><code>edit.paste.before.select</code></a></td><td>Paste before and select</td><td><code>Shift+P</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)</td></tr>
<tr><td><a href="../edit.ts#L56"><code>edit.pasteAll.after</code></a></td><td>Paste all after</td><td></td></tr>
<tr><td><a href="../edit.ts#L58"><code>edit.pasteAll.after.select</code></a></td><td>Paste all after and select</td><td></td></tr>
<tr><td><a href="../edit.ts#L55"><code>edit.pasteAll.before</code></a></td><td>Paste all before</td><td></td></tr>
<tr><td><a href="../edit.ts#L57"><code>edit.pasteAll.before.select</code></a></td><td>Paste all before and select</td><td></td></tr>
<tr><td><a href="../edit.ts#L50"><code>edit.selectRegister-insert</code></a></td><td>Pick register and replace</td><td><code>Ctrl+R</code> (<code>editorTextFocus && dance.mode == 'insert'</code>)</td></tr>
<tr><td><a href="../edit.ts#L61"><code>edit.yank-delete</code></a></td><td>Copy and delete</td><td><code>D</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)<code>D</code> (<code>editorTextFocus && dance.mode == 'select'</code>)</td></tr>
<tr><td><a href="../edit.ts#L62"><code>edit.yank-delete-insert</code></a></td><td>Copy, delete and switch to Insert</td><td><code>C</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)<code>C</code> (<code>editorTextFocus && dance.mode == 'select'</code>)</td></tr>
<tr><td><a href="../edit.ts#L63"><code>edit.yank-replace</code></a></td><td>Copy and replace</td><td></td></tr>
<tr><td><a href="#edit.indent"><code>edit.indent</code></a></td><td>Indent selected lines</td><td><code>Shift+.</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)<code>Shift+.</code> (<code>editorTextFocus && dance.mode == 'select'</code>)</td></tr>
<tr><td><a href="#edit.indent.withEmpty"><code>edit.indent.withEmpty</code></a></td><td>Indent selected lines (including empty lines)</td><td><code>Shift+Alt+.</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)<code>Shift+Alt+.</code> (<code>editorTextFocus && dance.mode == 'select'</code>)</td></tr>
<tr><td><a href="#edit.insert"><code>edit.insert</code></a></td><td>Insert contents of register</td><td><code>Shift+R</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)<code>Shift+R</code> (<code>editorTextFocus && dance.mode == 'select'</code>)</td></tr>
<tr><td><a href="#edit.join"><code>edit.join</code></a></td><td>Join lines</td><td><code>Shift+J</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)<code>Shift+J</code> (<code>editorTextFocus && dance.mode == 'select'</code>)</td></tr>
<tr><td><a href="#edit.join.select"><code>edit.join.select</code></a></td><td>Join lines and select inserted separators</td><td><code>Shift+Alt+J</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)<code>Shift+Alt+J</code> (<code>editorTextFocus && dance.mode == 'select'</code>)</td></tr>
<tr><td><a href="#edit.newLine.above"><code>edit.newLine.above</code></a></td><td>Insert new line above each selection</td><td><code>Shift+Alt+O</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)<code>Shift+Alt+O</code> (<code>editorTextFocus && dance.mode == 'select'</code>)</td></tr>
<tr><td><a href="#edit.newLine.below"><code>edit.newLine.below</code></a></td><td>Insert new line below each selection</td><td><code>Alt+O</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)<code>Alt+O</code> (<code>editorTextFocus && dance.mode == 'select'</code>)</td></tr>
<tr><td><a href="#edit.replaceCharacters"><code>edit.replaceCharacters</code></a></td><td>Replace characters</td><td><code>R</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)<code>R</code> (<code>editorTextFocus && dance.mode == 'select'</code>)</td></tr>
<tr><td rowspan=11><a href="#history"><code>history</code></a></td><td><a href="../history.ts#L60"><code>history.repeat.seek</code></a></td><td>Repeat last seek</td><td><code>Alt+.</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)</td></tr>
<tr><td><a href="../history.ts#L59"><code>history.repeat.selection</code></a></td><td>Repeat last selection change</td><td></td></tr>
<tr><td><a href="#history.recording.play"><code>history.recording.play</code></a></td><td>Replay recording</td><td><code>Q</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)<code>Q</code> (<code>editorTextFocus && dance.mode == 'select'</code>)</td></tr>
<tr><td><a href="#history.recording.start"><code>history.recording.start</code></a></td><td>Start recording</td><td><code>Shift+Q</code> (<code>editorTextFocus && dance.mode == 'normal' && !dance.isRecording</code>)<code>Shift+Q</code> (<code>editorTextFocus && dance.mode == 'select' && !dance.isRecording</code>)</td></tr>
<tr><td><a href="#history.recording.stop"><code>history.recording.stop</code></a></td><td>Stop recording</td><td><code>Escape</code> (<code>editorTextFocus && dance.mode == 'normal' && dance.isRecording</code>)<code>Shift+Q</code> (<code>editorTextFocus && dance.mode == 'normal' && dance.isRecording</code>)<code>Escape</code> (<code>editorTextFocus && dance.mode == 'select' && dance.isRecording</code>)<code>Shift+Q</code> (<code>editorTextFocus && dance.mode == 'select' && dance.isRecording</code>)</td></tr>
<tr><td><a href="#history.redo"><code>history.redo</code></a></td><td>Redo</td><td><code>Shift+U</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)<code>Shift+U</code> (<code>editorTextFocus && dance.mode == 'select'</code>)</td></tr>
<tr><td><a href="#history.redo.selections"><code>history.redo.selections</code></a></td><td>Redo a change of selections</td><td><code>Shift+Alt+U</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)<code>Shift+Alt+U</code> (<code>editorTextFocus && dance.mode == 'select'</code>)</td></tr>
<tr><td><a href="#history.repeat"><code>history.repeat</code></a></td><td>Repeat last change</td><td></td></tr>
<tr><td><a href="#history.repeat.edit"><code>history.repeat.edit</code></a></td><td>Repeat last edit without a command</td><td><code>.</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)<code>.</code> (<code>editorTextFocus && dance.mode == 'select'</code>)</td></tr>
<tr><td><a href="#history.undo"><code>history.undo</code></a></td><td>Undo</td><td><code>U</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)<code>U</code> (<code>editorTextFocus && dance.mode == 'select'</code>)</td></tr>
<tr><td><a href="#history.undo.selections"><code>history.undo.selections</code></a></td><td>Undo a change of selections</td><td><code>Alt+U</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)<code>Alt+U</code> (<code>editorTextFocus && dance.mode == 'select'</code>)</td></tr>
<tr><td rowspan=1><a href="#keybindings"><code>keybindings</code></a></td><td><a href="#keybindings.setup"><code>keybindings.setup</code></a></td><td>Set up Dance keybindings</td><td></td></tr>
<tr><td rowspan=9><a href="#misc"><code>misc</code></a></td><td><a href="#cancel"><code>cancel</code></a></td><td>Cancel Dance operation</td><td><code>Escape</code> (<code>editorTextFocus && dance.mode == 'normal' && !dance.isRecording && !markersNavigationVisible</code>)<code>Escape</code> (<code>editorTextFocus && dance.mode == 'input' && !suggestWidgetVisible</code>)</td></tr>
<tr><td><a href="#changeInput"><code>changeInput</code></a></td><td>Change current input</td><td></td></tr>
<tr><td><a href="#ifEmpty"><code>ifEmpty</code></a></td><td>Executes one of the specified commands depending on whether the current
selections are empty</td><td></td></tr>
<tr><td><a href="#ignore"><code>ignore</code></a></td><td>Ignore key</td><td></td></tr>
<tr><td><a href="#openMenu"><code>openMenu</code></a></td><td>Open menu</td><td></td></tr>
<tr><td><a href="#run"><code>run</code></a></td><td>Run code</td><td></td></tr>
<tr><td><a href="#selectRegister"><code>selectRegister</code></a></td><td>Select register for next command</td><td><code>Shift+'</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)</td></tr>
<tr><td><a href="#updateCount"><code>updateCount</code></a></td><td>Update Dance count</td><td></td></tr>
<tr><td><a href="#updateRegister"><code>updateRegister</code></a></td><td>Update the contents of a register</td><td></td></tr>
<tr><td rowspan=11><a href="#modes"><code>modes</code></a></td><td><a href="../modes.ts#L24"><code>modes.insert.after</code></a></td><td>Insert after</td><td><code>A</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)</td></tr>
<tr><td><a href="../modes.ts#L23"><code>modes.insert.before</code></a></td><td>Insert before</td><td><code>I</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)</td></tr>
<tr><td><a href="../modes.ts#L26"><code>modes.insert.lineEnd</code></a></td><td>Insert at line end</td><td><code>Shift+A</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)</td></tr>
<tr><td><a href="../modes.ts#L25"><code>modes.insert.lineStart</code></a></td><td>Insert at line start</td><td><code>Shift+I</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)</td></tr>
<tr><td><a href="../modes.ts#L16"><code>modes.set.insert</code></a></td><td>Set mode to Insert</td><td></td></tr>
<tr><td><a href="../modes.ts#L15"><code>modes.set.normal</code></a></td><td>Set mode to Normal</td><td><code>Escape</code> (<code>editorTextFocus && dance.mode == 'insert' && !suggestWidgetVisible</code>)<code>Escape</code> (<code>editorTextFocus && dance.mode == 'select'</code>)<code>V</code> (<code>editorTextFocus && dance.mode == 'select'</code>)</td></tr>
<tr><td><a href="../modes.ts#L17"><code>modes.set.select</code></a></td><td>Set mode to Select</td><td><code>V</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)</td></tr>
<tr><td><a href="../modes.ts#L43"><code>modes.set.temporarily.insert</code></a></td><td>Temporary Insert mode</td><td><code>Ctrl+V</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)</td></tr>
<tr><td><a href="../modes.ts#L42"><code>modes.set.temporarily.normal</code></a></td><td>Temporary Normal mode</td><td><code>Ctrl+V</code> (<code>editorTextFocus && dance.mode == 'insert'</code>)</td></tr>
<tr><td><a href="#modes.set"><code>modes.set</code></a></td><td>Set Dance mode</td><td></td></tr>
<tr><td><a href="#modes.set.temporarily"><code>modes.set.temporarily</code></a></td><td>Set Dance mode temporarily</td><td></td></tr>
<tr><td rowspan=8><a href="#search"><code>search</code></a></td><td><a href="#search.next"><code>search.next</code></a></td><td>Select next match</td><td><code>N</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)<code>N</code> (<code>editorTextFocus && dance.mode == 'select'</code>)</td></tr>
<tr><td><a href="#search.search"><code>search.search</code></a></td><td>Search</td><td><code>/</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)<code>NumPad_Divide</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)<code>/</code> (<code>editorTextFocus && dance.mode == 'select'</code>)<code>NumPad_Divide</code> (<code>editorTextFocus && dance.mode == 'select'</code>)</td></tr>
<tr><td><a href="../search.ts#L32"><code>search.backward</code></a></td><td>Search backward</td><td><code>Alt+/</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)<code>Alt+/</code> (<code>editorTextFocus && dance.mode == 'select'</code>)</td></tr>
<tr><td><a href="../search.ts#L33"><code>search.backward.extend</code></a></td><td>Search backward (extend)</td><td><code>Shift+Alt+/</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)</td></tr>
<tr><td><a href="../search.ts#L31"><code>search.extend</code></a></td><td>Search (extend)</td><td><code>Shift+/</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)<code>Shift+/</code> (<code>editorTextFocus && dance.mode == 'select'</code>)</td></tr>
<tr><td><a href="../search.ts#L205"><code>search.previous</code></a></td><td>Select previous match</td><td><code>Shift+N</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)<code>Shift+N</code> (<code>editorTextFocus && dance.mode == 'select'</code>)</td></tr>
<tr><td><a href="../search.ts#L131"><code>search.selection.smart</code></a></td><td>Search current selection (smart)</td><td><code>Shift+8</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)<code>NumPad_Multiply</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)<code>Shift+8</code> (<code>editorTextFocus && dance.mode == 'select'</code>)<code>NumPad_Multiply</code> (<code>editorTextFocus && dance.mode == 'select'</code>)</td></tr>
<tr><td><a href="#search.selection"><code>search.selection</code></a></td><td>Search current selection</td><td><code>Shift+Alt+8</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)<code>Alt+NumPad_Multiply</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)<code>Shift+Alt+8</code> (<code>editorTextFocus && dance.mode == 'select'</code>)<code>Alt+NumPad_Multiply</code> (<code>editorTextFocus && dance.mode == 'select'</code>)</td></tr>
<tr><td rowspan=37><a href="#seek"><code>seek</code></a></td><td><a href="#seek.enclosing"><code>seek.enclosing</code></a></td><td>Select to next enclosing character</td><td></td></tr>
<tr><td><a href="#seek.leap"><code>seek.leap</code></a></td><td>Leap forward</td><td></td></tr>
<tr><td><a href="#seek.object"><code>seek.object</code></a></td><td>Select object</td><td></td></tr>
<tr><td><a href="#seek.seek"><code>seek.seek</code></a></td><td>Select to character (excluded)</td><td><code>T</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)</td></tr>
<tr><td><a href="../seek.ts#L358"><code>seek.askObject</code></a></td><td>Select whole object</td><td></td></tr>
<tr><td><a href="../seek.ts#L364"><code>seek.askObject.end</code></a></td><td>Select to whole object end</td><td></td></tr>
<tr><td><a href="../seek.ts#L365"><code>seek.askObject.end.extend</code></a></td><td>Extend to whole object end</td><td></td></tr>
<tr><td><a href="../seek.ts#L359"><code>seek.askObject.inner</code></a></td><td>Select inner object</td><td></td></tr>
<tr><td><a href="../seek.ts#L366"><code>seek.askObject.inner.end</code></a></td><td>Select to inner object end</td><td></td></tr>
<tr><td><a href="../seek.ts#L367"><code>seek.askObject.inner.end.extend</code></a></td><td>Extend to inner object end</td><td></td></tr>
<tr><td><a href="../seek.ts#L362"><code>seek.askObject.inner.start</code></a></td><td>Select to inner object start</td><td></td></tr>
<tr><td><a href="../seek.ts#L363"><code>seek.askObject.inner.start.extend</code></a></td><td>Extend to inner object start</td><td></td></tr>
<tr><td><a href="../seek.ts#L360"><code>seek.askObject.start</code></a></td><td>Select to whole object start</td><td></td></tr>
<tr><td><a href="../seek.ts#L361"><code>seek.askObject.start.extend</code></a></td><td>Extend to whole object start</td><td></td></tr>
<tr><td><a href="../seek.ts#L44"><code>seek.backward</code></a></td><td>Select to character (excluded, backward)</td><td><code>Shift+T</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)</td></tr>
<tr><td><a href="../seek.ts#L128"><code>seek.enclosing.backward</code></a></td><td>Select to previous enclosing character</td><td></td></tr>
<tr><td><a href="../seek.ts#L127"><code>seek.enclosing.extend</code></a></td><td>Extend to next enclosing character</td><td></td></tr>
<tr><td><a href="../seek.ts#L129"><code>seek.enclosing.extend.backward</code></a></td><td>Extend to previous enclosing character</td><td></td></tr>
<tr><td><a href="../seek.ts#L43"><code>seek.extend</code></a></td><td>Extend to character (excluded)</td><td><code>T</code> (<code>editorTextFocus && dance.mode == 'select'</code>)</td></tr>
<tr><td><a href="../seek.ts#L45"><code>seek.extend.backward</code></a></td><td>Extend to character (excluded, backward)</td><td><code>Shift+T</code> (<code>editorTextFocus && dance.mode == 'select'</code>)</td></tr>
<tr><td><a href="../seek.ts#L46"><code>seek.included</code></a></td><td>Select to character (included)</td><td><code>F</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)</td></tr>
<tr><td><a href="../seek.ts#L48"><code>seek.included.backward</code></a></td><td>Select to character (included, backward)</td><td><code>Shift+F</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)</td></tr>
<tr><td><a href="../seek.ts#L47"><code>seek.included.extend</code></a></td><td>Extend to character (included)</td><td><code>F</code> (<code>editorTextFocus && dance.mode == 'select'</code>)</td></tr>
<tr><td><a href="../seek.ts#L49"><code>seek.included.extend.backward</code></a></td><td>Extend to character (included, backward)</td><td><code>Shift+F</code> (<code>editorTextFocus && dance.mode == 'select'</code>)</td></tr>
<tr><td><a href="../seek.ts#L658"><code>seek.leap.backward</code></a></td><td>Leap backward</td><td></td></tr>
<tr><td><a href="../seek.ts#L260"><code>seek.word.backward</code></a></td><td>Select to previous word start</td><td><code>B</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)</td></tr>
<tr><td><a href="../seek.ts#L259"><code>seek.word.extend</code></a></td><td>Extend to next word start</td><td><code>W</code> (<code>editorTextFocus && dance.mode == 'select'</code>)</td></tr>
<tr><td><a href="../seek.ts#L261"><code>seek.word.extend.backward</code></a></td><td>Extend to previous word start</td><td><code>B</code> (<code>editorTextFocus && dance.mode == 'select'</code>)</td></tr>
<tr><td><a href="../seek.ts#L262"><code>seek.word.ws</code></a></td><td>Select to next non-whitespace word start</td><td><code>Shift+W</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)</td></tr>
<tr><td><a href="../seek.ts#L264"><code>seek.word.ws.backward</code></a></td><td>Select to previous non-whitespace word start</td><td><code>Shift+B</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)</td></tr>
<tr><td><a href="../seek.ts#L263"><code>seek.word.ws.extend</code></a></td><td>Extend to next non-whitespace word start</td><td><code>Shift+W</code> (<code>editorTextFocus && dance.mode == 'select'</code>)</td></tr>
<tr><td><a href="../seek.ts#L265"><code>seek.word.ws.extend.backward</code></a></td><td>Extend to previous non-whitespace word start</td><td><code>Shift+B</code> (<code>editorTextFocus && dance.mode == 'select'</code>)</td></tr>
<tr><td><a href="../seek.ts#L266"><code>seek.wordEnd</code></a></td><td>Select to next word end</td><td><code>E</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)</td></tr>
<tr><td><a href="../seek.ts#L267"><code>seek.wordEnd.extend</code></a></td><td>Extend to next word end</td><td><code>E</code> (<code>editorTextFocus && dance.mode == 'select'</code>)</td></tr>
<tr><td><a href="../seek.ts#L268"><code>seek.wordEnd.ws</code></a></td><td>Select to next non-whitespace word end</td><td><code>Shift+E</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)</td></tr>
<tr><td><a href="../seek.ts#L269"><code>seek.wordEnd.ws.extend</code></a></td><td>Extend to next non-whitespace word end</td><td><code>Shift+E</code> (<code>editorTextFocus && dance.mode == 'select'</code>)</td></tr>
<tr><td><a href="#seek.word"><code>seek.word</code></a></td><td>Select to next word start</td><td><code>W</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)</td></tr>
<tr><td rowspan=41><a href="#select"><code>select</code></a></td><td><a href="#select.buffer"><code>select.buffer</code></a></td><td>Select whole buffer</td><td><code>Shift+5</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)<code>Shift+5</code> (<code>editorTextFocus && dance.mode == 'select'</code>)</td></tr>
<tr><td><a href="#select.firstVisibleLine"><code>select.firstVisibleLine</code></a></td><td>Select to first visible line</td><td></td></tr>
<tr><td><a href="#select.horizontally"><code>select.horizontally</code></a></td><td>Select horizontally</td><td></td></tr>
<tr><td><a href="#select.lastLine"><code>select.lastLine</code></a></td><td>Select to last line</td><td></td></tr>
<tr><td><a href="#select.lastVisibleLine"><code>select.lastVisibleLine</code></a></td><td>Select to last visible line</td><td></td></tr>
<tr><td><a href="#select.line.above"><code>select.line.above</code></a></td><td>Select line above</td><td></td></tr>
<tr><td><a href="#select.line.above.extend"><code>select.line.above.extend</code></a></td><td>Extend to line above</td><td></td></tr>
<tr><td><a href="#select.line.below"><code>select.line.below</code></a></td><td>Select line below</td><td></td></tr>
<tr><td><a href="#select.line.below.extend"><code>select.line.below.extend</code></a></td><td>Extend to line below</td><td></td></tr>
<tr><td><a href="#select.lineEnd"><code>select.lineEnd</code></a></td><td>Select to line end</td><td><code>Alt+L</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)<code>End</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)</td></tr>
<tr><td><a href="#select.lineStart"><code>select.lineStart</code></a></td><td>Select to line start</td><td></td></tr>
<tr><td><a href="#select.middleVisibleLine"><code>select.middleVisibleLine</code></a></td><td>Select to middle visible line</td><td></td></tr>
<tr><td><a href="../select.ts#L586"><code>select.documentEnd.extend</code></a></td><td>Extend to last character</td><td></td></tr>
<tr><td><a href="../select.ts#L585"><code>select.documentEnd.jump</code></a></td><td>Jump to last character</td><td></td></tr>
<tr><td><a href="../select.ts#L55"><code>select.down.extend</code></a></td><td>Extend down</td><td><code>J</code> (<code>editorTextFocus && dance.mode == 'select'</code>)<code>Down</code> (<code>editorTextFocus && dance.mode == 'select'</code>)</td></tr>
<tr><td><a href="../select.ts#L54"><code>select.down.jump</code></a></td><td>Jump down</td><td><code>J</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)<code>Down</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)</td></tr>
<tr><td><a href="../select.ts#L536"><code>select.firstLine.extend</code></a></td><td>Extend to first line</td><td></td></tr>
<tr><td><a href="../select.ts#L535"><code>select.firstLine.jump</code></a></td><td>Jump to first line</td><td></td></tr>
<tr><td><a href="../select.ts#L671"><code>select.firstVisibleLine.extend</code></a></td><td>Extend to first visible line</td><td></td></tr>
<tr><td><a href="../select.ts#L670"><code>select.firstVisibleLine.jump</code></a></td><td>Jump to first visible line</td><td></td></tr>
<tr><td><a href="../select.ts#L642"><code>select.lastLine.extend</code></a></td><td>Extend to last line</td><td></td></tr>
<tr><td><a href="../select.ts#L641"><code>select.lastLine.jump</code></a></td><td>Jump to last line</td><td></td></tr>
<tr><td><a href="../select.ts#L711"><code>select.lastVisibleLine.extend</code></a></td><td>Extend to last visible line</td><td></td></tr>
<tr><td><a href="../select.ts#L710"><code>select.lastVisibleLine.jump</code></a></td><td>Jump to last visible line</td><td></td></tr>
<tr><td><a href="../select.ts#L288"><code>select.left.extend</code></a></td><td>Extend left</td><td><code>H</code> (<code>editorTextFocus && dance.mode == 'select'</code>)<code>Left</code> (<code>editorTextFocus && dance.mode == 'select'</code>)</td></tr>
<tr><td><a href="../select.ts#L287"><code>select.left.jump</code></a></td><td>Jump left</td><td><code>H</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)<code>Left</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)</td></tr>
<tr><td><a href="../select.ts#L584"><code>select.lineEnd.extend</code></a></td><td>Extend to line end</td><td><code>Shift+Alt+L</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)<code>Shift+End</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)</td></tr>
<tr><td><a href="../select.ts#L532"><code>select.lineStart.extend</code></a></td><td>Extend to line start</td><td><code>Shift+Alt+H</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)<code>Shift+Home</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)</td></tr>
<tr><td><a href="../select.ts#L531"><code>select.lineStart.jump</code></a></td><td>Jump to line start</td><td><code>Alt+H</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)<code>Shift+G</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)</td></tr>
<tr><td><a href="../select.ts#L534"><code>select.lineStart.skipBlank.extend</code></a></td><td>Extend to line start (skip blank)</td><td></td></tr>
<tr><td><a href="../select.ts#L533"><code>select.lineStart.skipBlank.jump</code></a></td><td>Jump to line start (skip blank)</td><td></td></tr>
<tr><td><a href="../select.ts#L691"><code>select.middleVisibleLine.extend</code></a></td><td>Extend to middle visible line</td><td></td></tr>
<tr><td><a href="../select.ts#L690"><code>select.middleVisibleLine.jump</code></a></td><td>Jump to middle visible line</td><td></td></tr>
<tr><td><a href="../select.ts#L286"><code>select.right.extend</code></a></td><td>Extend right</td><td><code>L</code> (<code>editorTextFocus && dance.mode == 'select'</code>)<code>Right</code> (<code>editorTextFocus && dance.mode == 'select'</code>)</td></tr>
<tr><td><a href="../select.ts#L285"><code>select.right.jump</code></a></td><td>Jump right</td><td><code>L</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)<code>Right</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)</td></tr>
<tr><td><a href="../select.ts#L367"><code>select.to.extend</code></a></td><td>Extend to</td><td><code>G</code> (<code>editorTextFocus && dance.mode == 'select'</code>)</td></tr>
<tr><td><a href="../select.ts#L366"><code>select.to.jump</code></a></td><td>Go to</td><td><code>G</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)</td></tr>
<tr><td><a href="../select.ts#L57"><code>select.up.extend</code></a></td><td>Extend up</td><td><code>K</code> (<code>editorTextFocus && dance.mode == 'select'</code>)<code>Up</code> (<code>editorTextFocus && dance.mode == 'select'</code>)</td></tr>
<tr><td><a href="../select.ts#L56"><code>select.up.jump</code></a></td><td>Jump up</td><td><code>K</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)<code>Up</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)</td></tr>
<tr><td><a href="#select.to"><code>select.to</code></a></td><td>Select to</td><td></td></tr>
<tr><td><a href="#select.vertically"><code>select.vertically</code></a></td><td>Select vertically</td><td></td></tr>
<tr><td rowspan=37><a href="#selections"><code>selections</code></a></td><td><a href="#selections.changeDirection"><code>selections.changeDirection</code></a></td><td>Change direction of selections</td><td><code>Alt+;</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)<code>Alt+;</code> (<code>editorTextFocus && dance.mode == 'select'</code>)</td></tr>
<tr><td><a href="#selections.changeOrder"><code>selections.changeOrder</code></a></td><td>Reverse selections</td><td></td></tr>
<tr><td><a href="#selections.copy"><code>selections.copy</code></a></td><td>Copy selections below</td><td><code>Shift+C</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)<code>Shift+C</code> (<code>editorTextFocus && dance.mode == 'select'</code>)</td></tr>
<tr><td><a href="#selections.expandToLines"><code>selections.expandToLines</code></a></td><td>Expand to lines</td><td><code>X</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)<code>X</code> (<code>editorTextFocus && dance.mode == 'select'</code>)</td></tr>
<tr><td><a href="#selections.filter"><code>selections.filter</code></a></td><td>Filter selections</td><td><code>Shift+4</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)</td></tr>
<tr><td><a href="#selections.merge"><code>selections.merge</code></a></td><td>Merge contiguous selections</td><td><code>Shift+Alt+-</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)<code>Shift+Alt+-</code> (<code>editorTextFocus && dance.mode == 'select'</code>)</td></tr>
<tr><td><a href="#selections.open"><code>selections.open</code></a></td><td>Open selected file</td><td></td></tr>
<tr><td><a href="#selections.pipe"><code>selections.pipe</code></a></td><td>Pipe selections</td><td><code>Shift+Alt+\</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)</td></tr>
<tr><td><a href="#selections.reduce"><code>selections.reduce</code></a></td><td>Reduce selections to their cursor</td><td><code>;</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)<code>;</code> (<code>editorTextFocus && dance.mode == 'select'</code>)</td></tr>
<tr><td><a href="#selections.restore"><code>selections.restore</code></a></td><td>Restore selections</td><td><code>Z</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)</td></tr>
<tr><td><a href="#selections.restore.withCurrent"><code>selections.restore.withCurrent</code></a></td><td>Combine register selections with current ones</td><td><code>Alt+Z</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)</td></tr>
<tr><td><a href="#selections.save"><code>selections.save</code></a></td><td>Save selections</td><td><code>Shift+Z</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)</td></tr>
<tr><td><a href="#selections.saveText"><code>selections.saveText</code></a></td><td>Copy selections text</td><td><code>Y</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)<code>Y</code> (<code>editorTextFocus && dance.mode == 'select'</code>)</td></tr>
<tr><td><a href="#selections.select"><code>selections.select</code></a></td><td>Select within selections</td><td></td></tr>
<tr><td><a href="../selections.ts#L362"><code>selections.clear.main</code></a></td><td>Clear main selections</td><td><code>Alt+,</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)<code>Alt+,</code> (<code>editorTextFocus && dance.mode == 'select'</code>)</td></tr>
<tr><td><a href="../selections.ts#L361"><code>selections.clear.secondary</code></a></td><td>Clear secondary selections</td><td><code>,</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)<code>,</code> (<code>editorTextFocus && dance.mode == 'select'</code>)</td></tr>
<tr><td><a href="../selections.ts#L958"><code>selections.copy.above</code></a></td><td>Copy selections above</td><td><code>Shift+Alt+C</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)<code>Shift+Alt+C</code> (<code>editorTextFocus && dance.mode == 'select'</code>)</td></tr>
<tr><td><a href="../selections.ts#L778"><code>selections.faceBackward</code></a></td><td>Backward selections</td><td></td></tr>
<tr><td><a href="../selections.ts#L777"><code>selections.faceForward</code></a></td><td>Forward selections</td><td><code>Shift+Alt+;</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)<code>Shift+Alt+;</code> (<code>editorTextFocus && dance.mode == 'select'</code>)</td></tr>
<tr><td><a href="../selections.ts#L359"><code>selections.filter.regexp</code></a></td><td>Keep matching selections</td><td><code>Shift+K</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)<code>Shift+K</code> (<code>editorTextFocus && dance.mode == 'select'</code>)</td></tr>
<tr><td><a href="../selections.ts#L360"><code>selections.filter.regexp.inverse</code></a></td><td>Clear matching selections</td><td><code>Shift+Alt+K</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)<code>Shift+Alt+K</code> (<code>editorTextFocus && dance.mode == 'select'</code>)</td></tr>
<tr><td><a href="../selections.ts#L1049"><code>selections.hideIndices</code></a></td><td>Hide selection indices</td><td></td></tr>
<tr><td><a href="../selections.ts#L826"><code>selections.orderAscending</code></a></td><td>Order selections ascending</td><td></td></tr>
<tr><td><a href="../selections.ts#L825"><code>selections.orderDescending</code></a></td><td>Order selections descending</td><td></td></tr>
<tr><td><a href="../selections.ts#L295"><code>selections.pipe.append</code></a></td><td>Pipe and append</td><td><code>Shift+1</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)</td></tr>
<tr><td><a href="../selections.ts#L296"><code>selections.pipe.prepend</code></a></td><td>Pipe and prepend</td><td><code>Shift+Alt+1</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)</td></tr>
<tr><td><a href="../selections.ts#L294"><code>selections.pipe.replace</code></a></td><td>Pipe and replace</td><td><code>Shift+\</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)</td></tr>
<tr><td><a href="../selections.ts#L687"><code>selections.reduce.edges</code></a></td><td>Reduce selections to their ends</td><td><code>Shift+Alt+S</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)<code>Shift+Alt+S</code> (<code>editorTextFocus && dance.mode == 'select'</code>)</td></tr>
<tr><td><a href="../selections.ts#L433"><code>selections.select.orLeap</code></a></td><td>Leap or select</td><td><code>S</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)<code>S</code> (<code>editorTextFocus && dance.mode == 'select'</code>)</td></tr>
<tr><td><a href="../selections.ts#L1048"><code>selections.showIndices</code></a></td><td>Show selection indices</td><td></td></tr>
<tr><td><a href="../selections.ts#L509"><code>selections.splitLines.orLeap.backward</code></a></td><td>Leap or select backward</td><td><code>Alt+S</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)<code>Alt+S</code> (<code>editorTextFocus && dance.mode == 'select'</code>)</td></tr>
<tr><td><a href="#selections.sort"><code>selections.sort</code></a></td><td>Sort selections</td><td></td></tr>
<tr><td><a href="#selections.split"><code>selections.split</code></a></td><td>Split selections</td><td><code>Shift+S</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)<code>Shift+S</code> (<code>editorTextFocus && dance.mode == 'select'</code>)</td></tr>
<tr><td><a href="#selections.splitLines"><code>selections.splitLines</code></a></td><td>Split selections at line boundaries</td><td></td></tr>
<tr><td><a href="#selections.toggleIndices"><code>selections.toggleIndices</code></a></td><td>Toggle selection indices</td><td><code>Enter</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)<code>Enter</code> (<code>editorTextFocus && dance.mode == 'select'</code>)</td></tr>
<tr><td><a href="#selections.trimLines"><code>selections.trimLines</code></a></td><td>Trim lines</td><td><code>Alt+X</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)<code>Alt+X</code> (<code>editorTextFocus && dance.mode == 'select'</code>)</td></tr>
<tr><td><a href="#selections.trimWhitespace"><code>selections.trimWhitespace</code></a></td><td>Trim whitespace</td><td><code>Shift+-</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)<code>Shift+-</code> (<code>editorTextFocus && dance.mode == 'select'</code>)</td></tr>
<tr><td rowspan=6><a href="#selections.rotate"><code>selections.rotate</code></a></td><td><a href="#selections.rotate.both"><code>selections.rotate.both</code></a></td><td>Rotate selections clockwise</td><td><code>Shift+Alt+9</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)<code>Shift+Alt+9</code> (<code>editorTextFocus && dance.mode == 'select'</code>)</td></tr>
<tr><td><a href="#selections.rotate.contents"><code>selections.rotate.contents</code></a></td><td>Rotate selections clockwise (contents only)</td><td></td></tr>
<tr><td><a href="#selections.rotate.selections"><code>selections.rotate.selections</code></a></td><td>Rotate selections clockwise (selections only)</td><td><code>Shift+9</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)<code>Shift+9</code> (<code>editorTextFocus && dance.mode == 'select'</code>)</td></tr>
<tr><td><a href="../selections.rotate.ts#L19"><code>selections.rotate.both.reverse</code></a></td><td>Rotate selections counter-clockwise</td><td><code>Shift+Alt+0</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)<code>Shift+Alt+0</code> (<code>editorTextFocus && dance.mode == 'select'</code>)</td></tr>
<tr><td><a href="../selections.rotate.ts#L42"><code>selections.rotate.contents.reverse</code></a></td><td>Rotate selections counter-clockwise (contents only)</td><td></td></tr>
<tr><td><a href="../selections.rotate.ts#L66"><code>selections.rotate.selections.reverse</code></a></td><td>Rotate selections counter-clockwise (selections only)</td><td><code>Shift+0</code> (<code>editorTextFocus && dance.mode == 'normal'</code>)<code>Shift+0</code> (<code>editorTextFocus && dance.mode == 'select'</code>)</td></tr>
<tr><td rowspan=1><a href="#space"><code>space</code></a></td><td><a href="#space.open"><code>space.open</code></a></td><td>Open space menu</td><td></td></tr>
<tr><td rowspan=1><a href="#view"><code>view</code></a></td><td><a href="#view.line"><code>view.line</code></a></td><td>Reveals a position based on the main cursor</td><td></td></tr>
<tr><td rowspan=1><a href="#window"><code>window</code></a></td><td><a href="#window.open"><code>window.open</code></a></td><td>Open window menu</td><td></td></tr>
</tbody>
</table>

</details>

## [`bracket`](../bracket.ts)

Window menu.

@commands

| Title                                | Keybinding                                   | Command                                  |
| ------------------------------------ | -------------------------------------------- | ---------------------------------------- |
| Show left bracket menu        | `[` (helix: normal), `[` (helix: select) | `[".openMenu", { menu: "left-bracket", ... }]` |
| Show right bracket  menu        | `]` (helix: normal), `]` (helix: select) | `[".openMenu", { menu: "right-bracket", ... }]` |

<a name="bracket.openLeftBracket" />

### [`bracket.openLeftBracket`](../bracket.ts#L18)

Open window menu.

## [`dev`](../dev.ts)

Developer utilities for Dance.

<a name="dev.setSelectionBehavior" />

### [`dev.setSelectionBehavior`](../dev.ts#L15)

Set the selection behavior of the specified mode.

<a name="dev.copyLastErrorMessage" />

### [`dev.copyLastErrorMessage`](../dev.ts#L43)

Copies the last encountered error message.

## [`edit`](../edit.ts)

Perform changes on the text content of the document.

See https://github.com/mawww/kakoune/blob/master/doc/pages/keys.asciidoc#changes.

<a name="edit.insert" />

### [`edit.insert`](../edit.ts#L65)

Insert contents of register.

A `where` argument may be specified to state where the text should be
inserted relative to each selection. If unspecified, each selection will be
replaced by the text.

Specify `"shift": "select"` to select the inserted selection,
`"shift": "extend"` to extend to the inserted text, and nothing to keep the
current selections.

Specify `all` to paste all contents next to each selection.


Default keybinding: `s-r` (helix: normal)
`s-r` (helix: select)

<a name="edit.join" />

### [`edit.join`](../edit.ts#L174)

Join lines.


Default keybinding: `s-j` (helix: normal)
`s-j` (helix: select)

<a name="edit.join.select" />

### [`edit.join.select`](../edit.ts#L183)

Join lines and select inserted separators.


Default keybinding: `s-a-j` (helix: normal)
`s-a-j` (helix: select)

<a name="edit.indent" />

### [`edit.indent`](../edit.ts#L194)

Indent selected lines.


Default keybinding: `>` (helix: normal)
`>` (helix: select)

<a name="edit.indent.withEmpty" />

### [`edit.indent.withEmpty`](../edit.ts#L203)

Indent selected lines (including empty lines).


Default keybinding: `a->` (kakoune: normal)
`a->` (kakoune: select)

<a name="edit.deindent" />

### [`edit.deindent`](../edit.ts#L212)

Deindent selected lines.


Default keybinding: `a-<` (kakoune: normal)
`a-<` (kakoune: select)

<a name="edit.deindent.withIncomplete" />

### [`edit.deindent.withIncomplete`](../edit.ts#L225)

Deindent selected lines (including incomplete indent).


Default keybinding: `<` (helix: normal)
`<` (helix: normal)

<a name="edit.case.toLower" />

### [`edit.case.toLower`](../edit.ts#L238)

Transform to lower case.


Default keybinding: `` ` `` (helix: normal)
`` ` `` (helix: select)

<a name="edit.case.toUpper" />

### [`edit.case.toUpper`](../edit.ts#L247)

Transform to upper case.


Default keybinding: `` a-` `` (helix: normal)
`` a-` `` (helix: select)

<a name="edit.case.swap" />

### [`edit.case.swap`](../edit.ts#L256)

Swap case.


Default keybinding: `` s-` `` (helix: normal)
`` s-` `` (helix: select)

<a name="edit.replaceCharacters" />

### [`edit.replaceCharacters`](../edit.ts#L276)

Replace characters.


Default keybinding: `r` (helix: normal)
`r` (helix: select)

<a name="edit.align" />

### [`edit.align`](../edit.ts#L336)

Align selections.

Align selections, aligning the cursor of each selection by inserting spaces
before the first character of each selection.


Default keybinding: `&` (helix: normal)
`&` (helix: select)

<a name="edit.alignByOffet" />

### [`edit.alignByOffet`](../edit.ts#L381)

Align selections by offset from start character (negative offset).

What is negative offset?
E.g.
0 offset is the start character of the selection.
1 offset is the character before the start character of the selection.

Align selections, aligning the cursor of each selection by inserting negative offset character
before the first character of each selection.


Default keybinding: `c-&` (helix: normal)
`c-&` (helix: select)

<a name="edit.copyIndentation" />

### [`edit.copyIndentation`](../edit.ts#L415)

Copy indentation.

Copy the indentation of the main selection (or the count one if a count is
given) to all other ones.


Default keybinding: `a-&` (kakoune: normal)
`a-&` (kakoune: select)

<a name="edit.newLine.above" />

### [`edit.newLine.above`](../edit.ts#L462)

Insert new line above each selection.

Specify `"shift": "select"` to select the inserted selections, and nothing to
keep the current selections.


Default keybinding: `s-a-o` (kakoune: normal)
`s-a-o` (kakoune: select)

<a name="edit.newLine.below" />

### [`edit.newLine.below`](../edit.ts#L506)

Insert new line below each selection.

Specify `"shift": "select"` to select the inserted selections, and nothing to
keep the current selections.


Default keybinding: `a-o` (kakoune: normal)
`a-o` (kakoune: select)

## [`history`](../history.ts)

Interact with history.

<a name="history.undo" />

### [`history.undo`](../history.ts#L19)

Undo.


Default keybinding: `u` (helix: normal)
`u` (helix: select)

<a name="history.redo" />

### [`history.redo`](../history.ts#L28)

Redo.


Default keybinding: `s-u` (helix: normal)
`s-u` (helix: select)

<a name="history.undo.selections" />

### [`history.undo.selections`](../history.ts#L37)

Undo a change of selections.


Default keybinding: `a-u` (helix: normal)
`a-u` (helix: select)

<a name="history.redo.selections" />

### [`history.redo.selections`](../history.ts#L46)

Redo a change of selections.


Default keybinding: `s-a-u` (helix: normal)
`s-a-u` (helix: select)

<a name="history.repeat" />

### [`history.repeat`](../history.ts#L62)

Repeat last change.

<a name="history.repeat.edit" />

### [`history.repeat.edit`](../history.ts#L103)

Repeat last edit without a command.


Default keybinding: `.` (helix: normal)
`.` (helix: select)

<a name="history.recording.play" />

### [`history.recording.play`](../history.ts#L148)

Replay recording.


Default keybinding: `q` (helix: normal)
`q` (helix: select)

<a name="history.recording.start" />

### [`history.recording.start`](../history.ts#L175)

Start recording.


Default keybinding: `s-q` (helix: normal, !recording)
`s-q` (helix: select, !recording)

<a name="history.recording.stop" />

### [`history.recording.stop`](../history.ts#L194)

Stop recording.


Default keybinding: `escape` (helix: normal, recording)
`s-q` (helix: normal, recording)
`escape` (helix: select, recording)
`s-q` (helix: select, recording)

## [`keybindings`](../keybindings.ts)

Utilities for setting up keybindings.

<a name="keybindings.setup" />

### [`keybindings.setup`](../keybindings.ts#L16)

Set up Dance keybindings.

## [`match`](../match.ts)

Match menu.

@commands

| Title                                | Keybinding            | Command                                  |
| ------------------------------------ | --------------------- | ---------------------------------------- |
| Show match menu                      | `m` (helix: normal)   | `[".openMenu", { menu: "match", ... }]` |
| Show match menu (extend)             | `m` (helix: select)   | `[".openMenu", { menu: "match", pass: [{shift: "extend"}], ... }]` |
| Show match menu (backward )          | `s-m` (helix: normal) | `[".openMenu", { menu: "match", pass: [{direction: -1}], ... }]` |
| Show match menu (backward, extend)   | `s-m` (helix: select) | `[".openMenu", { menu: "match", pass: [{direction: -1, shift: "extend"}], ... }]` |

## [`misc`](../misc.ts)

Miscellaneous commands that don't deserve their own category.

By default, Dance also exports the following keybindings for existing
commands:

| Keybinding                                   | Command                                      |
| -------------------------------------------- | -------------------------------------------- |
| `s-;` (helix: normal), `s-;` (helix: select) | `["workbench.action.showCommands", { ... }]` |
| `c-c` (helix: normal), `c-c` (helix: select) | `["editor.action.commentLine", { ... }]`     |

<a name="cancel" />

### [`cancel`](../misc.ts#L41)

Cancel Dance operation.


Default keybinding: `escape` (core: normal, !recording, "!markersNavigationVisible")
`escape` (core: input, "!suggestWidgetVisible")

<a name="ignore" />

### [`ignore`](../misc.ts#L50)

Ignore key.

<a name="run" />

### [`run`](../misc.ts#L155)

Run code.

There are two ways to invoke this command. The first one is to provide an
`code` string argument. This code must be a valid JavaScript string, and will
be executed with full access to the [Dance API](../api/README.md). For
instance,

```json
{
  "command": "dance.run",
  "args": {
    "code": "Selections.set(Selections.filter(text => text.includes('foo')))",
  },
},
```

If no argument is provided, a prompt will be shown asking for an input.
Furthermore, an array of strings can be passed to make longer functions
easier to read:

```json
{
  "command": "dance.run",
  "args": {
    "code": [
      "for (const selection of Selections.current) {",
      "  console.log(text(selection));",
      "}",
    ],
  },
},
```

The second way to use this command is with the `commands` argument. This
argument must be an array of "command-like" values. The simplest
"command-like" value is a string corresponding to the command itself:

```json
{
  "command": "dance.run",
  "args": {
    "commands": [
      "dance.modes.set.normal",
    ],
  },
},
```

But arguments can also be provided by passing an array:

```json
{
  "command": "dance.run",
  "args": {
    "commands": [
      ["dance.modes.set", { "mode": "normal" }],
    ],
  },
},
```

Or by passing an object, like regular VS Code key bindings:

```json
{
  "command": "dance.run",
  "args": {
    "commands": [
      {
        "command": "dance.modes.set",
        "args": { "mode": "normal" },
      },
    ],
  },
},
```

These values can be mixed:

```json
{
  "command": "dance.run",
  "args": {
    "commands": [
      ["dance.selections.saveText", { "register": "^" }],
      {
        "command": "dance.modes.set",
        "args": { "mode": "normal" },
      },
      "hideSuggestWidget",
    ],
  },
},
```

If both `code` and `commands` are given, Dance will use `code` if arbitrary
code execution is enabled, or `commands` otherwise.

<a name="selectRegister" />

### [`selectRegister`](../misc.ts#L222)

Select register for next command.

When selecting a register, the next key press is used to determine what
register is selected. If this key is a `space` character, then a new key
press is awaited again and the returned register will be specific to the
current document.


Default keybinding: `"` (kakoune: normal)

<a name="updateRegister" />

### [`updateRegister`](../misc.ts#L250)

Update the contents of a register.

<a name="updateCount" />

### [`updateCount`](../misc.ts#L308)

Update Dance count.

Update the current counter used to repeat the next command.

<a name="openMenu" />

### [`openMenu`](../misc.ts#L358)

Open menu.

If no menu is specified, a prompt will ask for the name of the menu to open.

Alternatively, a `menu` can be inlined in the arguments.

Pass a `prefix` argument to insert the prefix string followed by the typed
key if it does not match any menu entry. This can be used to implement chords
like `jj`.

<a name="changeInput" />

### [`changeInput`](../misc.ts#L435)

Change current input.

When showing some menus, Dance can navigate their history:

| Keybinding            | Command                                    |
| --------------------- | ------------------------------------------ |
| `up` (core: prompt)   | `[".changeInput", { action: "previous" }]` |
| `down` (core: prompt) | `[".changeInput", { action: "next"     }]` |

<a name="ifEmpty" />

### [`ifEmpty`](../misc.ts#L453)

Executes one of the specified commands depending on whether the current
selections are empty.

## [`modes`](../modes.ts)

Set modes.

<a name="modes.set" />

### [`modes.set`](../modes.ts#L30)

Set Dance mode.

<a name="modes.set.temporarily" />

### [`modes.set.temporarily`](../modes.ts#L47)

Set Dance mode temporarily.

## [`search`](../search.ts)

Search for patterns and replace or add selections.

<a name="search.search" />

### [`search.search`](../search.ts#L36)

Search.


Default keybinding: `/` (helix: normal)
`NumPad_Divide` (helix: normal)
`/` (helix: select)
`NumPad_Divide` (helix: select)

<a name="search.selection" />

### [`search.selection`](../search.ts#L133)

Search current selection.


Default keybinding: `a-*` (kakoune: normal)
`a-NumPad_Multiply` (kakoune: normal)
`a-*` (kakoune: select)
`a-NumPad_Multiply` (kakoune: select)

<a name="search.next" />

### [`search.next`](../search.ts#L208)

Select next match.


Default keybinding: `n` (helix: normal)
`n` (helix: select)

## [`seek`](../seek.ts)

Update selections based on the text surrounding them.

<a name="seek.seek" />

### [`seek.seek`](../seek.ts#L53)

Select to character (excluded).


Default keybinding: `t` (helix: normal)

<a name="seek.enclosing" />

### [`seek.enclosing`](../seek.ts#L133)

Select to next enclosing character.

<a name="seek.word" />

### [`seek.word`](../seek.ts#L272)

Select to next word start.

Select the word and following whitespaces on the right of the end of each selection.


Default keybinding: `w` (helix: normal)

<a name="seek.object" />

### [`seek.object`](../seek.ts#L382)

Select object.

<a name="seek.leap" />

### [`seek.leap`](../seek.ts#L660)

Leap forward.

Inspired by [`leap.nvim`](https://github.com/ggandor/leap.nvim).

## [`select`](../select.ts)

Update selections based on their position in the document.

<a name="select.buffer" />

### [`select.buffer`](../select.ts#L29)

Select whole buffer.


Default keybinding: `%` (helix: normal)
`%` (helix: select)

<a name="select.vertically" />

### [`select.vertically`](../select.ts#L68)

Select vertically.

<a name="select.horizontally" />

### [`select.horizontally`](../select.ts#L290)

Select horizontally.

<a name="select.to" />

### [`select.to`](../select.ts#L369)

Select to.

If a count is specified, this command will shift to the start of the given
line. If no count is specified, this command will shift open the `goto` menu.

<a name="select.line.below" />

### [`select.line.below`](../select.ts#L378)

Select line below.

<a name="select.line.below.extend" />

### [`select.line.below.extend`](../select.ts#L409)

Extend to line below.

<a name="select.line.above" />

### [`select.line.above`](../select.ts#L444)

Select line above.

<a name="select.line.above.extend" />

### [`select.line.above.extend`](../select.ts#L471)

Extend to line above.

<a name="select.lineStart" />

### [`select.lineStart`](../select.ts#L538)

Select to line start.

<a name="select.lineEnd" />

### [`select.lineEnd`](../select.ts#L589)

Select to line end.


Default keybinding: `a-l` (kakoune: normal)
`end` (kakoune: normal)

<a name="select.lastLine" />

### [`select.lastLine`](../select.ts#L644)

Select to last line.

<a name="select.firstVisibleLine" />

### [`select.firstVisibleLine`](../select.ts#L673)

Select to first visible line.

<a name="select.middleVisibleLine" />

### [`select.middleVisibleLine`](../select.ts#L693)

Select to middle visible line.

<a name="select.lastVisibleLine" />

### [`select.lastVisibleLine`](../select.ts#L713)

Select to last visible line.

## [`selections`](../selections.ts)

Interacting with selections.

<a name="selections.saveText" />

### [`selections.saveText`](../selections.ts#L40)

Copy selections text.


Default keybinding: `y` (helix: normal)
`y` (helix: select)

<a name="selections.save" />

### [`selections.save`](../selections.ts#L54)

Save selections.


Default keybinding: `s-z` (kakoune: normal)

<a name="selections.restore" />

### [`selections.restore`](../selections.ts#L130)

Restore selections.


Default keybinding: `z` (kakoune: normal)

<a name="selections.restore.withCurrent" />

### [`selections.restore.withCurrent`](../selections.ts#L160)

Combine register selections with current ones.


Default keybinding: `a-z` (kakoune: normal)

<a name="selections.pipe" />

### [`selections.pipe`](../selections.ts#L299)

Pipe selections.

Run the specified command or code with the contents of each selection, and
save the result to a register.


Default keybinding: `a-|` (kakoune: normal)

<a name="selections.filter" />

### [`selections.filter`](../selections.ts#L366)

Filter selections.


Default keybinding: `$` (kakoune: normal)

<a name="selections.select" />

### [`selections.select`](../selections.ts#L435)

Select within selections.

<a name="selections.split" />

### [`selections.split`](../selections.ts#L468)

Split selections.


Default keybinding: `s-s` (helix: normal)
`s-s` (helix: select)

<a name="selections.splitLines" />

### [`selections.splitLines`](../selections.ts#L511)

Split selections at line boundaries.

<a name="selections.expandToLines" />

### [`selections.expandToLines`](../selections.ts#L583)

Expand to lines.

Expand selections to contain full lines (including end-of-line characters).


Default keybinding: `x` (helix: normal)
`x` (helix: select)

<a name="selections.trimLines" />

### [`selections.trimLines`](../selections.ts#L624)

Trim lines.

Trim selections to only contain full lines (from start to line break).


Default keybinding: `a-x` (helix: normal)
`a-x` (helix: select)

<a name="selections.trimWhitespace" />

### [`selections.trimWhitespace`](../selections.ts#L657)

Trim whitespace.

Trim whitespace at beginning and end of selections.


Default keybinding: `_` (helix: normal)
`_` (helix: select)

<a name="selections.reduce" />

### [`selections.reduce`](../selections.ts#L691)

Reduce selections to their cursor.


Default keybinding: `;` (helix: normal)
`;` (helix: select)

<a name="selections.changeDirection" />

### [`selections.changeDirection`](../selections.ts#L782)

Change direction of selections.


Default keybinding: `a-;` (helix: normal)
`a-;` (helix: select)

<a name="selections.changeOrder" />

### [`selections.changeOrder`](../selections.ts#L828)

Reverse selections.

<a name="selections.sort" />

### [`selections.sort`](../selections.ts#L853)

Sort selections.

<a name="selections.copy" />

### [`selections.copy`](../selections.ts#L962)

Copy selections below.


Default keybinding: `s-c` (helix: normal)
`s-c` (helix: select)

<a name="selections.merge" />

### [`selections.merge`](../selections.ts#L1014)

Merge contiguous selections.


Default keybinding: `a-_` (helix: normal)
`a-_` (helix: select)

<a name="selections.open" />

### [`selections.open`](../selections.ts#L1021)

Open selected file.

<a name="selections.toggleIndices" />

### [`selections.toggleIndices`](../selections.ts#L1053)

Toggle selection indices.


Default keybinding: `enter` (dance: normal)
`enter` (dance: select)

## [`selections.rotate`](../selections.rotate.ts)

Rotate selection indices and contents.

<a name="selections.rotate.both" />

### [`selections.rotate.both`](../selections.rotate.ts#L22)

Rotate selections clockwise.


Default keybinding: `a-(` (helix: normal)
`a-(` (helix: select)

<a name="selections.rotate.contents" />

### [`selections.rotate.contents`](../selections.rotate.ts#L44)

Rotate selections clockwise (contents only).

<a name="selections.rotate.selections" />

### [`selections.rotate.selections`](../selections.rotate.ts#L68)

Rotate selections clockwise (selections only).


Default keybinding: `(` (helix: normal)
`(` (helix: select)

## [`space`](../space.ts)

Space commands

@commands

| Title                   | Keybinding                                       | Command                                 |
| ----------------------- | ------------------------------------------------ | --------------------------------------- |
| Show space menu         | `space` (helix: normal), `space` (helix: select) | `[".openMenu", { menu: "space", ... }]` |

<a name="space.open" />

### [`space.open`](../space.ts#L16)

Open space menu.

## [`view`](../view.ts)

Moving the editor view.

@commands

| Title                   | Keybinding                                       | Command                                              |
| ----------------------- | ------------------------------------------------ | ---------------------------------------------------- |
| Show view menu          | `z` (helix: normal), `z` (helix: select)     | `[".openMenu", { menu: "view", ...               }]` |
| Show view menu (locked) | `s-z` (helix: normal), `s-z` (helix: select) | `[".openMenu", { menu: "view", locked: true, ... }]` |

<a name="view.line" />

### [`view.line`](../view.ts#L21)

Reveals a position based on the main cursor.

## [`window`](../window.ts)

Window menu.

@commands

| Title                   | Keybinding                                   | Command                                  |
| ----------------------- | -------------------------------------------- | ---------------------------------------- |
| Show window menu        | `c-w` (helix: normal), `c-w` (helix: select) | `[".openMenu", { menu: "window", ... }]` |

<a name="window.open" />

### [`window.open`](../window.ts#L17)

Open window menu.

