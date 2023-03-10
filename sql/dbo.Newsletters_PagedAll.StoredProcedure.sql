/*******************TEST CODE*******************

DECLARE @PageIndex int = 0
		,@PageSize int = 10

EXECUTE [dbo].[Newsletters_PagedAll]
		@PageIndex
		,@PageSize


***********************************************/
CREATE PROC [dbo].[Newsletters_PagedAll]
			@PageIndex int
			,@PageSize int
AS

BEGIN

	DECLARE @offset int = @PageIndex * @PageSize

	SELECT [N].[Id]
		  ,[NT].[Id] as 'TemplateId'
		  ,[N].[Name]
		  ,[N].CoverPhoto
		  ,[DateToPublish]
		  ,[DateToExpire]
		  ,[N].[DateCreated]
		  ,[N].[DateModified]
		  ,[U].[Id] as 'CreatedBy'
		  ,[TotalCount] = COUNT(1) OVER()

	  FROM [dbo].[Newsletters] as N
		inner join [dbo].[NewsletterTemplates] as NT
			ON [N].[TemplateId] = [NT].[Id]
		inner join [dbo].[Users] as U
			ON [N].[CreatedBy] = [U].[Id]

	  ORDER BY N.Id

		OFFSET @offSet Rows
		Fetch Next @PageSize Rows ONLY

END
GO
