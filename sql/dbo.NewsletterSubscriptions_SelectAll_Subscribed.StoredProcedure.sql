CREATE proc [dbo].[NewsletterSubscriptions_SelectAll_Subscribed]

				@PageIndex int 
				,@PageSize int

/*  --------------TEST CODE -----------------
	Declare
		@PageIndex int = 0
		,@PageSize int = 10

	Execute [dbo].[NewsletterSubscriptions_SelectAll_Subscribed]
		@PageIndex
		,@PageSize

	Select Email, IsSubscribed, DateCreated, DateModified
	From [dbo].[NewsletterSubscriptions]

*/
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
	WHERE IsSubscribed = 1

	Order by DateCreated DESC

		Offset @offset rows
		Fetch next @PageSize rows only
END
GO
