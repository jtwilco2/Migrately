/*******************TEST CODE*******************

EXECUTE [dbo].[Files_SelectAll]

DECLARE @id int = 87

EXECUTE [dbo].[Files_PermanentDelete]
		@Id

EXECUTE [dbo].[Files_SelectAll]

***********************************************/
CREATE PROC [dbo].[Files_PermanentDelete]
			@Id int

AS

BEGIN

	DELETE FROM [dbo].[Files]
	WHERE [Id] = @Id


END
GO
