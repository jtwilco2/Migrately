CREATE PROC [dbo].[PageSectionKeys_Delete]
			@Id int

AS

/* <--- TEST CODE DELETE --->

DECLARE 
		@Id int = 1;

EXECUTE dbo.PageSectionKeys_Delete
			 @Id


SELECT *
FROM dbo.PageSectionKeys
Where Id = @Id

   <--- TEST CODE DELETE ---> */

BEGIN

DELETE FROM dbo.PageSectionKeys

WHERE Id = @Id

END
GO
