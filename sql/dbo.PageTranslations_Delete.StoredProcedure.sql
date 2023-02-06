CREATE proc [dbo].[PageTranslations_Delete]
		@Id int

as

/* -----------Test Code---------------
Declare @Id int = 9;

		Select *
		From dbo.PageTranslations
		Where Id = @Id

Execute dbo.PageTranslations_Delete @Id


		Select *
		From dbo.PageTranslations
		Where Id = @Id

------------------------------------*/
BEGIN

UPDATE [dbo].[PageTranslations]
   SET [IsActive] = 0
 WHERE Id=@Id

END
GO
