CREATE PROC [dbo].[PageSectionContent_Delete]
			 @Id int

AS 

/* <--- TEST CODE INSERT --->

DECLARE 
		@Id int = 3;

EXECUTE dbo.PageSectionContent_Delete
			@Id 

SELECT *
FROM dbo.PageSectionContent
Where Id = @Id

   <--- TEST CODE INSERT ---> */

BEGIN

DELETE FROM dbo.PageSectionContent

WHERE Id = @Id

END
GO
