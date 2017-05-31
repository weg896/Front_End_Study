   
    Function stringTest(ByRef title As String)As String
        If (String.Compare(title, "Report", False) <> 0 And String.Compare(title, "Notes", False) <> 0 And String.Compare(title, "Problem", False) <> 0) Then
            If (title.Length < 7) Then
                Return "False"
            ElseIf (String.Compare(title.Substring(0, 7), "Status:", False) <> 0) Then
                Return "False"
            End If
        End If
        Return "True"
    End Function



    Console.WriteLine(stringTest("Report"));
    Console.WriteLine(stringTest("Notes"));