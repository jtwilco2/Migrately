/*******************TEST CODE*******************

DECLARE @PageIndex int = 0
		,@PageSize int = 10
		,@CreatedBy int = 1

EXECUTE [dbo].[NewsletterContent_CreatedByPaged]
		@PageIndex
		,@PageSize
		,@CreatedBy


***********************************************/
CREATE PROC [dbo].[NewsletterContent_CreatedByPaged]
			@PageIndex int
			,@PageSize int
			,@CreatedBy int
AS

BEGIN

	DECLARE @offset int = @PageIndex * @PageSize
	DECLARE @datNow datetime2 = getutcdate()

	SELECT [C].[Id]
		  ,[N].[Id] as 'NewsletterId'
		  ,[N].[Name] as 'NewsletterName'
		  ,[N].[CoverPhoto] as 'NewsletterPhoto'
		  ,[N].[DateToPublish]
		  ,[N].[DateToExpire]
		  ,[TK].[Id] as 'TemplateKeyId'
		  ,[TK].[KeyName] as 'TemplateKeyName'
		  ,[T].[Id] as 'TemplateId'
		  ,[T].[Name] as ' TemplateName'
		  ,[T].[Description] as 'TemplateDescription'
		  ,[T].[PrimaryImage] as 'TemplateImage'
		  ,[Value]
		  ,[C].[DateCreated]
		  ,[C].[DateModified]
		  ,[U].[Id] as 'CreatedById'
		  ,[U].[FirstName] as 'CreatedByFirst'
		  ,[U].[LastName] as 'CreatedByLast'
		  ,[TotalCount] = COUNT(1) OVER()

	  FROM [dbo].[NewsletterContent] as C 
		inner join [dbo].[Newsletters] as N
			ON [C].[NewsletterId] = [N].[Id]
		inner join [dbo].[NewsletterTemplateKeys] as TK
			ON [C].[TemplateKeyId] = [TK].[Id]
		inner join [dbo].[NewsletterTemplates] as T
			ON [T].[Id] = [TK].[TemplateId]
		inner join [dbo].[Users] as U
			ON [C].[CreatedBy] = [U].[Id]

	  WHERE [U].[Id] = @CreatedBy
	  ORDER BY N.Id

		OFFSET @offSet Rows
		Fetch Next @PageSize Rows ONLY

END
GO
