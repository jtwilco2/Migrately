/*******************TEST CODE*******************

EXECUTE [dbo].[NewsletterContent_SelectAll]

DECLARE @id int = 87

EXECUTE [dbo].[NewsletterContent_Delete]
		@Id

EXECUTE [dbo].[NewsletterContent_SelectAll]

***********************************************/
Create PROC [dbo].[NewsletterContent_Delete]
			@Id int

AS

BEGIN

	DELETE FROM [dbo].[NewsletterContent]
	WHERE [Id] = @Id


END
GO
