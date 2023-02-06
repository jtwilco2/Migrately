CREATE PROC [dbo].[ClientAttorney_Update]
						@Id int
						,@ModifiedBy int

AS

BEGIN

	DELETE FROM dbo.ClientAttorney 
	WHERE ClientId = @Id

	INSERT INTO dbo.ClientAttorney
					(ClientId
					,AttorneyId)
			VALUES	
					(@Id
					,@ModifiedBy)
END
GO
