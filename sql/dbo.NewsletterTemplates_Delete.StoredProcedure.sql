/*******************TEST CODE*******************

EXECUTE [dbo].[NewsletterTemplates_SelectAll]

DECLARE @id int = 87

EXECUTE [dbo].[NewsletterTemplates_Delete]
		@Id

EXECUTE [dbo].[NewsletterTemplates_SelectAll]

***********************************************/
Create PROC [dbo].[NewsletterTemplates_Delete]
			@Id int

AS

BEGIN

	DELETE FROM [dbo].[NewsletterTemplates]
	WHERE [Id] = @Id


END
GO
