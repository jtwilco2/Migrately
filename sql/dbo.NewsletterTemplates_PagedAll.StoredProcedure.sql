/*******************TEST CODE*******************

DECLARE @PageIndex int = 0
		,@PageSize int = 10

EXECUTE [dbo].[NewsletterTemplates_PagedAll]
		@PageIndex
		,@PageSize


***********************************************/
CREATE PROC [dbo].[NewsletterTemplates_PagedAll]
			@PageIndex int
			,@PageSize int
AS

BEGIN

	DECLARE @offset int = @PageIndex * @PageSize

	SELECT [N].[Id]
		  ,[N].[Name]
		  ,[Description]
		  ,[PrimaryImage]
		  ,[DateCreated]
		  ,[N].[DateModified]
		  ,[U].[Id] as 'CreatedBy'
		  ,[TotalCount] = COUNT(1) OVER()

	  FROM [dbo].[NewsletterTemplates] as N 
		inner join [dbo].[Users] as U
			ON [N].[CreatedBy] = [U].[Id]

	  ORDER BY N.Id

		OFFSET @offSet Rows
		Fetch Next @PageSize Rows ONLY

END
GO
