CREATE PROC [dbo].[PageSectionKeys_Update]
			 @PageSectionId int
			,@KeyName nvarchar(50)
			,@Id int OUTPUT

AS

/* <--- TEST CODE UPDATE --->

DECLARE 
		@Id int = 1;

DECLARE  
		 @PageSectionId int = 1
		,@KeyName nvarchar(50) = 'Test KeyName Updated'


EXECUTE dbo.PageSectionKeys_Update
			 @PageSectionId
			,@KeyName
			,@Id OUTPUT

SELECT *
FROM dbo.PageSectionKeys
Where Id = @Id

   <--- TEST CODE UPDATE ---> */

BEGIN


UPDATE dbo.PageSectionKeys
				 SET	
				 [PageSectionId]	= @PageSectionId
				,[KeyName]			= @KeyName
								
WHERE Id = @Id

END
GO
