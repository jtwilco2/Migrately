CREATE proc [dbo].[Languages_SelectAll]

/*

Execute [dbo].[Languages_SelectAll]

*/

as

BEGIN




SELECT [Id]
		,Code
      ,[Name]
  FROM [dbo].[Languages]


END
GO
