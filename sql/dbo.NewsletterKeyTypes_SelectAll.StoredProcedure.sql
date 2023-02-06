CREATE PROC [dbo].[NewsletterKeyTypes_SelectAll]   


/*----Test Code----			

		Execute [dbo].[NewsletterKeyTypes_SelectAll] 

*/ 
AS

BEGIN

SELECT	[Id]
		,[Name] as KeyTypeName
		,TotalCount = COUNT(1) OVER() 
		

FROM [dbo].[NewsletterKeyTypes]
Order By Id

END
GO
