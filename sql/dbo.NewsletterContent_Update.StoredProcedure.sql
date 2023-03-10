CREATE proc [dbo].[NewsletterContent_Update]
			@NewsletterId int
			,@TemplateKeyId int
			,@Value nchar(4000)
			,@CreatedBy int
			,@Id int
		
/*-------------- TEST CODE ------------------------------------
	Declare @Id int = 4;

	Declare @NewsletterId int = 2
           ,@TemplateKeyId int = 1
           ,@Value nchar(4000) = 'If you travel to the United States to join the vessel you will work on, in addition to a crewmember (D) visa, you also need a transit (C-1) visa or a combination C-1/D visa.'
           ,@CreatedBy int = 1

		SELECT *
		FROM [dbo].[NewsletterContent]
		WHERE Id = @Id
		
		Execute dbo.NewsletterContent_Update
			@NewsletterId
			,@TemplateKeyId
			,@Value
			,@CreatedBy
			,@Id

		SELECT *
		FROM [dbo].[NewsletterContent]
		WHERE Id = @Id

*/--------------------------------------------------------------

As

BEGIN

		DECLARE @DateModified datetime2 = getutcdate();

		UPDATE [dbo].NewsletterContent
			SET [NewsletterId] = @NewsletterId
				,[TemplateKeyId] = @TemplateKeyId
				,[Value] = @Value
				,[CreatedBy] = @CreatedBy
				,[DateModified] = @DateModified
			WHERE Id = @Id


END
GO
