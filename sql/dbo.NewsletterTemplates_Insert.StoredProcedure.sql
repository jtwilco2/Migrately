CREATE PROC [dbo].[NewsletterTemplates_Insert]
			@Name nvarchar(100)
			,@Description nvarchar(200)
			,@PrimaryImage nvarchar(255)
			,@CreatedBy int
			,@Id int OUTPUT

AS

/* <--- TEST CODE INSERT --->

DECLARE @Id int = 0;

DECLARE  @Name nvarchar(100) = 'Monthly Newsletter'
		,@Description nvarchar(200) = 'Primary Template for the Monthly Newsletter'
		,@PrimaryImage  nvarchar(255) = 'https://testimages.org/img/testimages_screenshot.jpg'
		,@CreatedBy int = 1


EXECUTE dbo.NewsletterTemplates_Insert
			@Name
			,@Description 
			,@PrimaryImage
			,@CreatedBy
			,@Id OUTPUT

SELECT *
	FROM dbo.NewsletterTemplates

   <--- TEST CODE INSERT ---> */

BEGIN


INSERT INTO dbo.NewsletterTemplates
			(
				 [Name]
				,[Description]
				,[PrimaryImage]
				,[CreatedBy]
								)

VALUES
			(
				 @Name
				,@Description 
				,@PrimaryImage
				,@CreatedBy
								)

				SET @Id = SCOPE_IDENTITY()

END
GO
