/*******************TEST CODE*******************

DECLARE @Id int = 1

EXECUTE [dbo].[NewsletterTemplates_Select_ById]
		@Id


***********************************************/
CREATE PROC [dbo].[NewsletterTemplates_Select_ById]
			@Id int
AS

BEGIN

	SELECT [N].[Id]
		  ,[N].[Name]
		  ,[Description]
		  ,[PrimaryImage]
		  ,[DateCreated]
		  ,[N].[DateModified]
		  ,[U].[Id] as 'CreatedBy'
		  ,[K].[KeyTypeId]
		  ,[T].[Name]
		  ,[K].[KeyName]
		  ,[K].[TemplateId]

	  FROM [dbo].[NewsletterTemplates] as N 
		inner join [dbo].[Users] as U
			ON [N].[CreatedBy] = [U].[Id]
		inner join [dbo].[NewsletterTemplateKeys] as K
			ON [N].[Id] = [K].[TemplateId]
		inner join [dbo].[NewsletterKeyTypes] as T
			ON [T].[Id] = [K].[KeyTypeId]
	  WHERE [N].[Id] = @Id

END
GO
