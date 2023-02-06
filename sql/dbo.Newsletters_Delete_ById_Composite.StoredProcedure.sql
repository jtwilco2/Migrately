/*******************TEST CODE*******************

EXECUTE [dbo].[Newsletter_PagedAll]

DECLARE @id int = 17

EXECUTE [dbo].[Newsletters_Delete_ById_Composite]
		@Id

EXECUTE [dbo].[Newsletters_PagedAll]

***********************************************/
CREATE PROC [dbo].[Newsletters_Delete_ById_Composite]
			@Id int

AS

BEGIN
	DELETE FROM [dbo].[NewsletterContent]
		WHERE [NewsletterId] = @Id


	DELETE FROM [dbo].[Newsletters]
		WHERE [Id] = @Id


END
GO
