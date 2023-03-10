CREATE proc [dbo].[NewsletterSubscriptions_Select_ByCreatedBy]

			@Email nvarchar(255)
			,@PageIndex int 
			,@PageSize int

/*  --------------TEST CODE -----------------

	Declare
		@Email nvarchar(255) = 'test1@email.com'
		,@PageIndex int = 0
		,@PageSize int = 3

	Execute [dbo].[NewsletterSubscriptions_Select_ByCreatedBy]
		@Email
		,@PageIndex
		,@PageSize

	Select Email, IsSubscribed, DateCreated, DateModified
	From [dbo].[NewsletterSubscriptions]

*/----------------------------------------------------
AS

BEGIN

	DECLARE 
		@offset int = @PageIndex * @PageSize

	SELECT	[Email]
			,IsSubscribed
			,[DateCreated]
			,[DateModified]
			,TotalCount = COUNT(1) OVER()

	FROM [dbo].[NewsletterSubscriptions]
	WHERE Email = @Email
	Order by Email

		Offset @offset rows
		Fetch next @PageSize rows only
END
GO
