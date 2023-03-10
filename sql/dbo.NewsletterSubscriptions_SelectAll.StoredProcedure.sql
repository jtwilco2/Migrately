CREATE proc [dbo].[NewsletterSubscriptions_SelectAll]

				@PageIndex int 
				,@PageSize int

/*  --------------TEST CODE -----------------
	Declare
		@PageIndex int = 0
		,@PageSize int = 3

	Execute [dbo].[NewsletterSubscriptions_SelectAll]
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

		Order by DateCreated DESC

		Offset @offset rows
		Fetch next @PageSize rows only
END
GO
