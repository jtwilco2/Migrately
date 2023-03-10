/*******************TEST CODE*******************

DECLARE @Id int = 2

EXECUTE [dbo].[NewsletterContent_Select_ByNewsletterId]
		@Id


***********************************************/
CREATE PROC [dbo].[NewsletterContent_Select_ByNewsletterId]
			@Id int
AS

BEGIN

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
		  ,[U].[Id] as 'CreatedBy Id'
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
	  WHERE [N].[Id] = @Id and ([N].[DateToPublish] < (@datNow)) and ([N].[DateToExpire] > (@datNow))

END
GO
