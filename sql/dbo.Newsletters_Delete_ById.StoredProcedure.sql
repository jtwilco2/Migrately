/*******************TEST CODE*******************

EXECUTE [dbo].[Newsletter_SelectAll]

DECLARE @id int = 87

EXECUTE [dbo].[Newsletters_Delete_ById]
		@Id

EXECUTE [dbo].[Newsletter_SelectAll]

***********************************************/
Create PROC [dbo].[Newsletters_Delete_ById]
			@Id int

AS

BEGIN

	DELETE FROM [dbo].[Newsletters]
	WHERE [Id] = @Id


END
GO
