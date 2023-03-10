CREATE proc [dbo].[NewsletterSubscriptions_Insert]

				@IsSubscribed bit
				,@Email nvarchar(255) OUTPUT

/*  --------------TEST CODE -----------------


	Declare
				@IsSubscribed bit = 0
				,@Email nvarchar(255) = 'test6@email.com'

	Execute [dbo].[NewsletterSubscriptions_Insert]
				@IsSubscribed
				,@Email OUTPUT

	Select Email, IsSubscribed, DateCreated, DateModified
	From [dbo].[NewsletterSubscriptions]

*/
AS

BEGIN

	INSERT INTO	[dbo].[NewsletterSubscriptions]
				([IsSubscribed]
				,[Email])
    
	VALUES	(@IsSubscribed
			,@Email)

	SET @Email = SCOPE_IDENTITY()

END
GO
