CREATE PROC [dbo].[PageSectionContent_Update]
			 @PageSectionKeyId int
			,@Text nvarchar(4000)
			,@LanguageId int
			,@CreatedBy int
			,@Id int OUTPUT

AS 

/* <--- TEST CODE INSERT --->

DECLARE 
		@Id int = 1;

DECLARE  
			 @PageSectionKeyId int = 1
			,@Text nvarchar(4000) = 'Test Text Updated'
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
		@DateModified datetime2(7) = GETUTCDATE()

UPDATE dbo.PageSectionContent
				 SET
				 [PageSectionKeyId] = @PageSectionKeyId
				,[Text]				= @Text
				,[LanguageId]		= @LanguageId
				,[DateModified]		= @DateModified
				,[CreatedBy]		= @CreatedBy
								
WHERE Id = @Id

END
GO
