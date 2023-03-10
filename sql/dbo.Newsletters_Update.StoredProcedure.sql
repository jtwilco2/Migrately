CREATE proc [dbo].[Newsletters_Update]
			@TemplateId int
			,@Name nvarchar(100)
			,@CoverPhoto nvarchar(255)
			,@DateToPublish datetime2(7)
			,@DateToExpire datetime2(7)
			,@CreatedBy int
			,@Id int OUTPUT
		
/*-------------- TEST CODE ------------------------------------
DECLARE @Id int = 1;

DECLARE  @TemplateId int = 1
		,@Name nvarchar(100) = 'template 2'
		,@CoverPhoto nvarchar(255) = 'coverphoto 1'
		,@DateToPublish datetime2(7) = '2023-3-1 12:00:00'
		,@DateToExpire datetime2(7) = '2023-3-8 12:00:00'
		,@CreatedBy int = 1

		SELECT *
			FROM [dbo].[Newsletters]
			WHERE Id = @Id
		
		EXECUTE dbo.Newsletters_Update
			@TemplateId
			,@Name
			,@CoverPhoto
			,@DateToPublish
			,@DateToExpire
			,@CreatedBy
			,@Id

		SELECT *
		FROM [dbo].[Newsletters]
		WHERE Id = @Id

*/--------------------------------------------------------------

As

BEGIN

	DECLARE @DateModified datetime2 = getutcdate();

	UPDATE [dbo].Newsletters
		SET [TemplateId] = @TemplateId
			,[Name] = @Name
			,[CoverPhoto] = @CoverPhoto
			,[DateToPublish] = @DateToPublish
			,[DateToExpire] = @DateToExpire
			,[CreatedBy] = @CreatedBy
			,[DateModified] = @DateModified
		WHERE Id = @Id

END
GO
