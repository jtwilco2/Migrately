CREATE PROC [dbo].[PageSectionContent_Insert]
			 @PageSectionKeyId int
			,@Text nvarchar(4000)
			,@LanguageId int
			,@CreatedBy int
			,@Id int OUTPUT

AS

/* <--- TEST CODE INSERT --->

DECLARE 
		@Id int = 0;

DECLARE  
			 @PageSectionKeyId int = 1
			,@Text nvarchar(4000) = 'Test Text'
			,@LanguageId int = 1
			,@CreatedBy int = 1


EXECUTE dbo.PageSectionContent_Insert
			 @PageSectionKeyId
			,@Text
			,@LanguageId
			,@CreatedBy
			,@Id OUTPUT

SELECT *
FROM dbo.PageSectionContent
Where Id = @Id

   <--- TEST CODE INSERT ---> */

BEGIN

DECLARE 
		@DateCreated datetime2(7) = GETUTCDATE()

INSERT INTO dbo.PageSectionContent
			(
				 [PageSectionKeyId]
				,[Text]
				,[LanguageId]
				,[DateCreated]
				,[CreatedBy]
								)

VALUES
			(
				 @PageSectionKeyId
				,@Text
				,@LanguageId
				,@DateCreated
				,@CreatedBy
								)

				SET @Id = SCOPE_IDENTITY()

END
GO
