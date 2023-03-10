CREATE proc [dbo].[NewsletterTemplates_Update]
			@Name nvarchar(100)
			,@Description nvarchar(200)
			,@PrimaryImage nvarchar(255)
			,@CreatedBy int
			,@Id int
		
/*-------------- TEST CODE ------------------------------------
	Declare @Id int = 2;

	Declare @Name nvarchar(100) = 'Platform Updates'
           ,@Description nvarchar(200) = 'Newsletter to notify users of updates to the platform'
           ,@PrimaryImage nvarchar(255) = 'https://testimages.org/img/testimages_screenshot.jpg'
           ,@CreatedBy int = 1

		SELECT *
		FROM [dbo].[NewsletterTemplates]
		WHERE Id = @Id
		
		Execute dbo.NewsletterTemplates_Update
			@Name
			,@Description 
			,@PrimaryImage
			,@CreatedBy
			,@Id


		SELECT *
		FROM [dbo].[NewsletterTemplates]
		WHERE Id = @Id

*/--------------------------------------------------------------

As

BEGIN

		DECLARE @DateModified datetime2 = getutcdate();

		UPDATE [dbo].NewsletterTemplates
			SET [Name] = @Name
				,[Description] = @Description
				,[PrimaryImage] = @PrimaryImage
				,[CreatedBy] = @CreatedBy
				,[DateModified] = @DateModified
			WHERE Id = @Id


END
GO
