CREATE proc [dbo].[NewsletterSubscriptions_Update]
		
				@IsSubscribed bit
				,@Email nvarchar(255)
		
/*-------------- TEST CODE ------------------------------------
	Declare @Email nvarchar(255) = 'test2@email.com'

	Declare
		@IsSubscribed bit = 1

	Select Email, IsSubscribed, DateCreated, DateModified
	From [dbo].[NewsletterSubscriptions] 

	Execute [dbo].[NewsletterSubscriptions_Update]
		@IsSubscribed
		,@Email

	Select Email, IsSubscribed, DateCreated, DateModified
	From [dbo].[NewsletterSubscriptions]
	Where Email = @Email

	Select Email, IsSubscribed, DateCreated, DateModified
	From [dbo].[NewsletterSubscriptions]

*/--------------------------------------------------------------

As

BEGIN

	DECLARE	@DateModified datetime2 = getutcdate()

	Update dbo.NewsletterSubscriptions
	
	SET	[IsSubscribed] = @IsSubscribed

	WHERE Email = @Email

END
GO
