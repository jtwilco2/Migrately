CREATE PROC [dbo].[PageSectionKeys_Insert]
			 @PageSectionId int
			,@KeyName nvarchar(50)
			,@Id int OUTPUT

AS

/* <--- TEST CODE INSERT --->

DECLARE 
		@Id int = 0;

DECLARE  
		 @PageSectionId int = 1
		,@KeyName nvarchar(50) = 'Test KeyName'


EXECUTE dbo.PageSectionKeys_Insert
			 @PageSectionId
			,@KeyName
			,@Id OUTPUT

SELECT *
FROM dbo.PageSectionKeys
Where Id = @Id

   <--- TEST CODE INSERT ---> */

BEGIN


INSERT INTO dbo.PageSectionKeys
			(
				 [PageSectionId]
				,[KeyName]
								)

VALUES
			(
				 @PageSectionId
				,@KeyName
								)

				SET @Id = SCOPE_IDENTITY()

END
GO
