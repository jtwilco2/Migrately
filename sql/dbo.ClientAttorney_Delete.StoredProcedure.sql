CREATE PROC [dbo].[ClientAttorney_Delete]
						@Id int						

AS

BEGIN

	DELETE FROM dbo.ClientAttorney 
	WHERE ClientId = @Id

END
GO
